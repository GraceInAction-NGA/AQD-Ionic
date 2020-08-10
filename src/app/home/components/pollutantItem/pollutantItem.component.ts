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
    constructor(public popoverController: PopoverController) {

    }
    async presentPopover(ev: any) {
      console.log("i got clicked")
      const popover2 = await this.popoverController.create({
        component: Popover,
        cssClass: 'my-custom-class',
        event: ev,
        translucent: true
      });
      return await popover2.present();
    }
}