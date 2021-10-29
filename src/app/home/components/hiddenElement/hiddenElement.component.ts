import { Component, Input, ElementRef, ViewChild } from '@angular/core';


@Component({  
  selector: 'HiddenElement',
  templateUrl: 'HiddenElement.component.html',
  styleUrls: ['HiddenElement.component.css'],
})


export class HiddenElement {
  @Input() hiddenText;
  @ViewChild('hiddenContent', {static: false}) hiddenContent: ElementRef;

    showDeepDive(){
        this.hiddenContent.nativeElement.hidden = false;
    }

}