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

    constructor(public popoverController: PopoverController) {

    }
    async presentPopover(ev: any) {
      this.popover = await this.popoverController.create({
        component: Popover,
        cssClass: 'module-popover2',
        event: ev,
        componentProps: {data: "hello"},
        translucent: false
      });
      this.popover.style.cssText = '--min-width: 90%; --max-width: 100%; --min-height: 90%; --max-height: 100%;';
      return await this.popover.present();
    }
}