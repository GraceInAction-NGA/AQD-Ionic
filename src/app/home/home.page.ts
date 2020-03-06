import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Chart} from "chart.js";
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
  AqiOfWeek:any;
  gauge: any;

  AQI_BASE_URL = "https://airqualid.herokuapp.com";
  GAUGE_IMG = "../assets/img/aqi.png";

  constructor(public GaugeService: GaugeService, public platform: Platform) {
    this.InitiatePlatformIfReady();
  };

  @ViewChild('chartContainer', {static: false})
  chartcontainer: ElementRef;

  @ViewChild('chartcanvas', {static: false})
  chartcanvas: ElementRef;

  @ViewChild('gaugeCanvas', {static: false})
  gaugeCanvas: ElementRef;

  ngAfterViewInit() {
    this.AqiOfWeek = [];

    let promiseSuccess = function({data}) {
      data.forEach(aqi => {
        if (this.AqiOfWeek.length > 5){
          this.AqiOfWeek.push(aqi.aqi.realTime)
        } else{
          this.AqiOfWeek.push(aqi.aqi.twentyfourHours)
        } 
      });
    };

    axios.get(`${this.AQI_BASE_URL}/aqi?limit=10`)
      .then(promiseSuccess.bind(this));
  }

  async InitiatePlatformIfReady() {
    try {
      await this.platform.ready();
      this.createChart();

      await this.renderGauge();
      this.subGaugeResize();
    } catch(e) {
      console.log("Platform failed to initialize.")
    }
  }


  createChart() {

    let bagOfDates = ['Today'];
    let date = today.getMonth() + '-' + today.getDate() + '-' + today.getFullYear();

    for (var i = 8; i >= 0; i--) {
      date = getYesterday(date.split('-')[0],date.split('-')[1],date.split('-')[2])  
      bagOfDates.push(printDate(date))
    }

    let dailyData = this.AqiOfWeek;
    let pointColors = [];

    for(i=0;i < dailyData.length; i++){
      if(dailyData[i] <= 50){
        pointColors[i] = "#9bc69f"
      }else if(dailyData[i] <= 100){
        pointColors[i] = "#f6db7a"
      }else if(dailyData[i] <= 150){
        pointColors[i] = "#fa845d"
      }else if(dailyData[i] <= 200){
        pointColors[i] = "#dc6e4c"
      }else{
        pointColors[i] = "#ba7fc3"
      }
    }

  


    this.myChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'line',
      data: {
        labels: bagOfDates.reverse(),
        datasets: [{  
            data: dailyData,
            label: "0-50",
            borderColor: "#9bc69f",
            fill: false,
            // backgroundColor: "#9bc69f",
            pointRadius: 1,
            pointBackgroundColor: pointColors
          },
          {  
            data: dailyData,
            label: "51-100",
            borderColor: "#f6db7a",
            fill: false,
            // backgroundColor: true,
            pointRadius: 1,
            pointBackgroundColor: pointColors
          },
          {  
            data: dailyData,
            label: "101-150",
            borderColor: "#fa845d",
            fill: false,
            // backgroundColor: true,
            pointRadius: 1,
            pointBackgroundColor: pointColors
          },
          {  
            data: dailyData,
            label: "151-200",
            borderColor: "#dc6e4c",
            fill: false,
            // backgroundColor: true,
            pointRadius: 1,
            pointBackgroundColor: pointColors
          },
          {  
            data: dailyData,
            label: "200+",
            borderColor: "#ba7fc3",
            fill: false,
            // backgroundColor: true,
            pointRadius:6,
            pointBackgroundColor: pointColors
          }
        ]
      },
      options: {
        legend:{
          labels:{
            boxWidth: 3,
          }
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ''
        }
      }
      });
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


let today = new Date();

// check date
let getYesterday = function(month, day, year) {
  month = Number(month);
  day = Number(day);
  year = Number(year);

  if (day === 1){
    if(month === 0){
      month = 11
      day = 31
      year--
     } else {
       month--
       
      if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9){
        day = 31
      }
     
       if(month === 3 || month === 5 || month === 8 || month === 10){
         day = 30
       }
     }
     if(month === 1){
       
      if(year % 4 === 0){
        day = 29
      } else {
        day = 28
      }
    }
   
  } else{
    day--
  }
 
  return month + "-" + day;
}

// print date
let printDate = (sysDateString) => {
  let parsedSysDate = sysDateString.split('-');
  let sysMonth = parsedSysDate[0];
  let sysDay = parsedSysDate[1];
  let sysYear = parsedSysDate[2];

  return Number(sysMonth)+1+"-"+ Number(sysDay);
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
