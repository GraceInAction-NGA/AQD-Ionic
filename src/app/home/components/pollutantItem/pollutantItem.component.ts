import { Component, ViewChild, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import axios from "axios";

@Component({  
  selector: 'PollutantItem',
  templateUrl: 'pollutantItem.component.html',
  styleUrls: ['pollutantItem.component.css'],
})

export class PollutantItem {
    @Input() data: any;
    constructor(){

    }
}