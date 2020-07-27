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
      value:9
    };
    PM10 = {
      label:"PM10",
      value:43
    };
    O3 = {
      label:"O3",
      value:9
    };
    NO2 = {
      label:"NO3",
      value:9
    };
    constructor(){
        
    }
}