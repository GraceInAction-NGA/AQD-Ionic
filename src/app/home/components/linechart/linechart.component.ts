import 'core-js/es7/reflect';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';  
import {Chart} from "chart.js";
import axios from "axios";

@Component({  
  selector: 'LineChart',  
  templateUrl: './linechart.component.html',  
  styleUrls: ['./linechart.component.css']  
})

export class LineChart implements OnInit {
    private TODAY: Date;
    AQI_BASE_URL = "https://airqualid.herokuapp.com";

    @ViewChild('lineChart', {static: false})
    lineChart: ElementRef;

    constructor() { }

    async ngOnInit() {
      const data: Array<any> = await this.getWeeklyAqis();
      this.TODAY = new Date();
      this.createChart(data);
    }

    async getWeeklyAqis() {
      const {data} = await axios.get(`${this.AQI_BASE_URL}/aqi?limit=10`);
      return data.reduce((acc, {aqi}) => {
        const newAqi = acc.length == 0 ? aqi.realTime : aqi.twentyfourHours;
        return [...acc, newAqi];
      }, []);
    };

    async createChart(data: Array<any>) {    
        Chart.pluginService.register({
            beforeDraw: this.renderGradientBackground
        });
        
        return new Chart(this.lineChart.nativeElement, {
          type: 'line',
          data: {
            labels: this.getDailyLabels(),
            datasets: [{  
                data: data.reverse(),
                label: "AQIS",
                showLine: true,
                borderColor: "#555",
                fill: false,
                backgroundColor: "#555",
                type: "line",
                pointRadius: 5,
              },
            ]
          },
          options: {
            legend:{
              display: false,
              labels:{
                boxWidth: 3,
              }
            },
            maintainAspectRatio: false,
            title: {
              display: true,
              text: ''
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    suggestedMax: 250
                  }
                }
              ]
            }
          }
        });
    }

    renderGradientBackground(chart: any) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const data: Array<any> = chart.config.data.datasets[0].data;
        const max = Math.max(...data);

        var gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    
        if (max > 250) {
            const scale = 250/max;
            gradient.addColorStop(0, '#9bc69f');
            gradient.addColorStop(.25* scale, '#f6db7a');
            gradient.addColorStop(.50* scale, '#fa845d');
            gradient.addColorStop(.75* scale, '#dc6e4c');
            gradient.addColorStop(1*scale, '#ba7fc3');
        } else {
            gradient.addColorStop(0, '#9bc69f'); // 0 - 50
            gradient.addColorStop(.25, '#f6db7a'); // 50 - 100
            gradient.addColorStop(.50, '#fa845d'); // 100 - 150
            gradient.addColorStop(.75, '#dc6e4c'); // 150 - 200
            gradient.addColorStop(1, '#ba7fc3'); // 200
        }
        
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
        );
        ctx.restore();
    }

    getYesterday(date: Date) {
        const monthsWith31Days = [0, 2, 4, 6, 7, 9];

        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        if (day === 1) {
            if (month === 0) {
                date.setMonth(11);
                date.setDate(31);
                date.setFullYear(year-1);
            } else if (month === 1) {
                date.setMonth(month-1);
                date.setDate((year % 4 === 0) ? 29 : 28);
            } else {
                date.setMonth(month-1);
                date.setDate((monthsWith31Days.includes(month-1)) ? 31 : 30);
            }
        } else {
            date.setDate(day-1);
        }
        return date;
    }

    printDates(date: Date) {
        return (date.getMonth() + 1) + "-" + (date.getDate());
    }

    getDailyLabels() {
        let date: Date = this.TODAY;
        const bagOfDates: Array<any> = ['Today'];
        for (var i = 8; i >= 0; i--) {
            date = this.getYesterday(date)
            bagOfDates.push(this.printDates(date))
        }
        return bagOfDates.reverse();
    }
}