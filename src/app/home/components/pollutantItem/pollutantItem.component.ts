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
      const popover = await this.popoverController.create({
        component: Popover,
        cssClass: 'module-popover2',
        event: ev,
        translucent: false
      });
      popover.style.cssText = '--min-width: 90%; --max-width: 100%; --min-height: 90%; --max-height: 100%;';
      return await popover.present();
    }
}