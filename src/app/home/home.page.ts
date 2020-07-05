import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Chart} from "chart.js";
import {GaugeService} from "./gauge.service";
import {ChartService} from "./chart.service";
import axios from "axios";

@Component({  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [GaugeService, ChartService],
})

export class HomePage {
  myChart: any;
  gauge: any;
  chart: any;

  AQI_BASE_URL = "https://airqualid.herokuapp.com";
  GAUGE_IMG = "../assets/img/aqi.png";

  constructor(public GaugeService: GaugeService, public ChartService: ChartService, public platform: Platform) {
    this.InitiatePlatformIfReady();
  };

  @ViewChild('chartContainer', {static: false})
  chartcontainer: ElementRef;

  @ViewChild('chartcanvas', {static: false})
  chartcanvas: ElementRef;

  @ViewChild('gaugeCanvas', {static: false})
  gaugeCanvas: ElementRef;

  async InitiatePlatformIfReady() {
    try {
      await this.platform.ready();
    
      await this.renderGauge();
      this.subGaugeResize();

      await this.renderChart();
    } catch(e) {
      console.log("Platform failed to initialize.")
    }
  }

  async renderChart() {
    let today = new Date();
    this.chart = new ChartService();
    this.chart.setDate(today);

    const dailyData = await this.getWeeklyAqis();
    this.chart.createChart(dailyData, this.chartcanvas)
  }

  async renderGauge() {
    try {
      const {data} = await axios.get(`${this.AQI_BASE_URL}/latest`);
      this.gauge = new GaugeService();
      this.gauge.setCanvas(this.gaugeCanvas.nativeElement);
      this.gauge.setImgSrc(this.GAUGE_IMG);
      this.gauge.renderGauge(data.aqi.realTime, data.category.realTime);
    } catch (e) {
      console.log("Unable to get latest aqi.")
      return Promise.reject(e);
    }
  }

  subGaugeResize() {
    const resize = () => this.gauge.resize()
    const debouncedRerender = debounce(resize.bind(this), 250, false);
    this.platform.resize.subscribe(debouncedRerender);
  }

  async getWeeklyAqis() {
    const {data} = await axios.get(`${this.AQI_BASE_URL}/aqi?limit=10`);
    return data.reduce((acc, {aqi}) => {
      const newAqi = acc.length == 8 ? aqi.realTime : aqi.twentyfourHours;
      return [...acc, newAqi];
    }, []);
  };
}  

let debounce = (func, wait, immediate) => {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};
