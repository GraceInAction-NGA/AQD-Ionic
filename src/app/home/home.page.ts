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
  gauge: any;

  constructor(public GaugeService: GaugeService, public platform: Platform) {
    this.InitiatePlatformIfReady();
  };

  @ViewChild('chartContainer', {static: false})
  chartcontainer: ElementRef;

  @ViewChild('chartcanvas', {static: false})
  chartcanvas: ElementRef;

  @ViewChild('gaugeCanvas', {static: false})
  gaugeCanvas: ElementRef;

  InitiatePlatformIfReady() {
    this.platform.ready().then(() => {
      this.createChart();

      axios.get("https://airqualid.herokuapp.com/latest").then(({data}) => {
        this.gauge = this.renderGauge(data.aqi.realTime, data.category.realTime);
      }).finally(()=> {
        let resize = () => this.gauge.resize()
        let debouncedRerender = debounce(resize.bind(this), 250, false);

        this.platform.resize.subscribe(debouncedRerender);
      });
    });
  }


  createChart() {

    let bagOfDates = ['Today'];
    let date = today.getMonth() + '-' + today.getDate() + '-' + today.getFullYear();

    for (var i = 8; i >= 0; i--) {
      date = getYesterday(date.split('-')[0],date.split('-')[1],date.split('-')[2])  
      bagOfDates.push(printDate(date))
    }
    let dailyData = [6,3,2,2,40,86,105,172,312];
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
            label: "PM 2.5",
            borderColor: "#555",
            fill: false,
            // backgroundColor: true,
            pointRadius: 9,
            pointBackgroundColor: pointColors
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: ''
        }
      }
      });
      }

  renderGauge(aqi, rating) {
    const gauge = new GaugeService();
    gauge.setCanvas(this.gaugeCanvas.nativeElement);
    gauge.setImgSrc("../assets/img/aqi.png");
    gauge.renderGauge(aqi, rating);
    return gauge;
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
 
  return month + "-" + day + "-" + year;
}

// print date
let printDate = (sysDateString) => {
  let parsedSysDate = sysDateString.split('-');
  let sysMonth = parsedSysDate[0];
  let sysDay = parsedSysDate[1];
  let sysYear = parsedSysDate[2];

  return `${Number(sysMonth)+1}-${sysDay}-${sysYear}`;
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
