import { Component } from '@angular/core';
import { PollutantItem } from '../pollutantItem/pollutantItem.component';

@Component({  
  selector: 'PollutantList',
  templateUrl: 'pollutantList.component.html',
  styleUrls: ['pollutantList.component.css'],
})

export class PollutantList {
    PM25 = {
      label:"PM2.5",
      description: "Small Particles",
      value:9,
      level:"Very Unhealthy",
      status: "Hazardous",
      unit: "µg/m"
    };
    PM10 = {
      label:"PM10",
      description: "Respirable Suspended Particle",
      value:43,
      level:"Unhealthy",
      status: "Unhealthy for living",
      unit: "µg/m"
    };
    O3 = {
      label:"O3",
      description: "Ozone",
      value:9,
      level:"Good",
      status: "Pretty Good",
      unit: "µg/m"
    };
    NO2 = {
      label:"NO2",
      description: "Nitrogen Dioxide",
      value:9,
      level:"Moderate",
      status: "Goodish",
      unit: "µg/m"
    };

    constructor(){ }

}