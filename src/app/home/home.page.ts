import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import {GaugeService} from "./gauge.service";
import axios from "axios";

@Component({  
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [GaugeService],
})

export class HomePage {
  myChart: any;
  gauge: any;
  chart: any;

  AQI_BASE_URL = "https://airqualid.herokuapp.com";
  GAUGE_IMG = "../assets/img/aqi.png";

  constructor(public GaugeService: GaugeService, public platform: Platform) {
    this.InitiatePlatformIfReady();
  };

  @ViewChild('gaugeCanvas', {static: false})
  gaugeCanvas: ElementRef;

  async InitiatePlatformIfReady() {
    try {
      await this.platform.ready();
    
      await this.renderGauge();
      this.subGaugeResize();
    } catch(e) {
      console.log("Platform failed to initialize.")
    }
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
