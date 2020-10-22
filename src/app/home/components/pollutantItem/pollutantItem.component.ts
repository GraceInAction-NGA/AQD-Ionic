import { Component, ViewChild, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import axios from "axios";
import { PopoverController } from '@ionic/angular';
import { Popover } from '../popover/popover.component';

@Component({  
  selector: 'PollutantItem',
  templateUrl: 'pollutantItem.component.html',
  styleUrls: ['pollutantItem.component.css'],
})

export class PollutantItem {
    @Input() data: any;
    popover: any;
    className:string;
    constructor(public popoverController: PopoverController) {
      this.className = "pollutantItemContainer";
    }
    async presentPopover(ev: any) {
      this.popover = await this.popoverController.create({
        component: Popover,
        cssClass: 'module-popover2',
        event: ev,
        componentProps: {data: this.data},
        translucent: false
      });
      this.popover.style.cssText = '--min-width: 90%; --max-width: 100%; --min-height: 90%; --max-height: 100%;';
      return await this.popover.present();
    }
    ngOnInit(){
      this.setColor();
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