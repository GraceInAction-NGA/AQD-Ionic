import { Component, ViewChild, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import axios from "axios";
import { PollutantItem } from '../pollutantItem/pollutantItem.component';


@Component({  
  selector: 'PollutantList',
  templateUrl: 'PollutantList.component.html',
  styleUrls: ['PollutantList.component.css'],
})

export class PollutantList {
    PM25 = {
      label:"PM2.5",
      value:9,
      status: "Hazardous",
      unit: "ug/m^3"
    };
    PM10 = {
      label:"PM10",
      value:43,
      status: "Unhealthy for living",
      unit: "ug/m^3"
    };
    O3 = {
      label:"O3",
      value:9,
      status: "Pretty Good",
      unit: "ug/m^3"
    };
    NO2 = {
      label:"NO3",
      value:9,
      status: "Goodish",
      unit: "ug/m^3"
    };
    constructor(){
        
    }
}