import { Component, Input } from '@angular/core';

@Component({  
  selector: 'Popover',
  templateUrl: 'Popover.component.html',
  styleUrls: ['Popover.component.css'],
})

export class Popover {
  @Input() data;
  @Input() popover;
  className: string = 'popover_title_wrapper';
  col1: string = "slide-wrapper";
  col2: string = "slide-wrapper";
  col3: string = "slide-wrapper";
  col4: string = "slide-wrapper";
  items : any = [1,2,3,4,2,4,2,6,89,6,7654,43,3456,76,543];
  pollutantInfo: any;
  constructor() { 

  }
  ngOnInit(){
    this.setColor();
    this.setPollutantInfo();
    this.setHighlight();
  }
  dismiss() {
    this.popover.dismiss();
  }
  setHighlight(){
  switch(this.data.level){
      case "Very Unhealthy":
        this.col4 += " highlighted";
        break;
      case "Unhealthy":
        this.col3 += " highlighted";
        break;
      case "Moderate":
        this.col2 += " highlighted";
        break;
      case "Good":
        this.col1 += " highlighted";
        break;
      default:
        console.log("invalid level");
        break;
    }
  }
  setColor(){
    switch(this.data.level){
      case "Very Unhealthy":
        this.className += " red";
        return "red";
      case "Unhealthy":
        this.className += " orange";
        return "orange";
      case "Moderate":
        this.className += " yellow";
        return "yellow";
      case "Good":
        this.className += " green";
        return "green";
      default:
        console.log("invalid level");
        break;
    }
  }
  setPollutantInfo(){
    switch(this.data.label){
      case "PM2.5":
        this.pollutantInfo = this.PM25Info;
        break;
      case "PM10":
        this.pollutantInfo = this.PM10Info;
        break;
      case "O3":
        this.pollutantInfo = this.O3Info;
        break;
      case "NO2":
        this.pollutantInfo = this.NO2Info;
        break;
      default:
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAH');
    }
  }
  
  PM25Info: any = [{
    title:"What Is PM2.5?",
    text:"PM2.5 is extremely small particles and droplets of pollution that because of their small size can penetrate deeply into lungs.",
    deepDive:"Airborne particulate matter, also known as PM or particle pollution, is a mixture of extremely small particles and liquid droplets that can include acids, organic chemicals, metals, soil and dust particles, and biological matter such as fungal spores. Smaller particles pose a health concern because they can be inhaled into and accumulate in the lungs. Particles less than 2.5 micrometers in diameter, called PM2.5 or “fine” particulate matter, pose the greatest health risks. Because of their small size (about 1/30th the width of a human hair), these tiny particles penetrate deeply into the lungs."
  },{
    title:"Why It Matters",
    text:"Exposure to PM, particularly PM2.5, can cause or worsen a number of diseases and can cause death.  PM2.5 can increase your risk of the following:",
    list:["Lung irritation, coughing, and difficulty breathing","Asthma attacks and hospitalizations– especially children","Adverse birth outcomes, including premature births and low birth weight babies","Decreased lung function and impaired lung growth in children and teenagers","Increased blood pressure","Heart attacks and irregular heartbeat","Cancer","Death"]
  },{
    title:"Local Sources",
    text:"",
    list:[""]
  },{
    title:"Pollutant Index",
  },{
    title:"References",
  }];
  PM10Info: any = [{
    title:"What Is PM10?",
  },{
    title:"Why It Matters",
  },{
    title:"Local Sources",
  },{
    title:"Pollutant Index",
  },{
    title:"References",
  }];
  O3Info: any = [{
    title:"What Is O3?",
  },{
    title:"Why It Matters",
  },{
    title:"Local Sources",
  },{
    title:"Pollutant Index",
  },{
    title:"References",
  }];
  NO2Info: any = [{
    title:"What Is NO2?",
  },{
    title:"Why It Matters",
  },{
    title:"Local Sources",
  },{
    title:"Pollutant Index",
  },{
    title:"References",
  }];
}