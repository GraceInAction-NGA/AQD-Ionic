import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { LineChart } from './components/linechart/linechart.component';
import { Gauge } from './components/gauge/gauge.component';
import { PollutantList } from './components/pollutantList/pollutantList.component';
import { PollutantItem } from './components/pollutantItem/pollutantItem.component';
import { Popover } from './components/popover/popover.component';
import { HiddenElement } from './components/hiddenElement/hiddenElement.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, LineChart, Gauge, PollutantList, PollutantItem, Popover, HiddenElement],
  entryComponents: [Popover],
})
export class HomePageModule { }
