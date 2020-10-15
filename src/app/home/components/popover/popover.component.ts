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
  constructor() { 

  }
  ngOnInit(){
    this.setColor();
  }
  dismiss() {
    this.popover.dismiss();
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
}