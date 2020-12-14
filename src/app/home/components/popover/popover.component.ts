import { Component, ViewChild, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import axios from "axios";

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
  },{
    title:"Why It Matters",
  },{
    title:"Local Sources",
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