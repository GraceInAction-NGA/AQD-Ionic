// push  github


let today = new Date();
console.log(today)
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

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myChart: any;

  @ViewChild('chartContainer', {static: false})
  chartcontainer: ElementRef;

  @ViewChild('chartcanvas', {static: false})
  chartcanvas: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }


  createChart() {

  let bagOfDates = ['Today'];
  let date = today.getMonth() + '-' + today.getDate() + '-' + today.getFullYear();

  for (var i = 8; i >= 0; i--) {
    date = getYesterday(date.split('-')[0],date.split('-')[1],date.split('-')[2])  
    bagOfDates.push(printDate(date))
  }

this.myChart = new Chart(this.chartcanvas.nativeElement, {
  type: 'line',
  data: {
    labels: bagOfDates.reverse(),
    datasets: [{  
        data: [6,3,2,2,7,26,82,172,312,433],
        label: "PM 2.5",
        borderColor: "#c45850",
        fill: false
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
}
