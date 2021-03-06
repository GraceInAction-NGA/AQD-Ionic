import { Component, ViewChild, ElementRef, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import axios from "axios";

@Component({  
  selector: 'Gauge',
  templateUrl: 'gauge.component.html',
  styleUrls: ['gauge.component.css'],
})

export class Gauge { 
  @Output() outputStatement = new EventEmitter<String>();

  AQI_BASE_URL = "https://airqualid.herokuapp.com";
  GAUGE_IMG = "../../../assets/img/aqi.png";

  private canvas: any;
    private imgSrc: any;

    private MAX_WIDTH = 500;
    private WIDTH = 500;
    private HEIGHT = 500;
    private MIN_DEGREE = 144;
    private HIGH_DEGREE = 400;
    private MIN_AQI = 0;
    private MAX_AQI = 200;
    private SIN = Math.sin(Math.PI / 180);
    private COS = Math.cos(Math.PI / 180);
    private AQI: any;
    private RATING: any;

  constructor(public platform: Platform) {
    this.InitiatePlatformIfReady();
  };

  @ViewChild('gaugeCanvas', {static: false})
  gaugeCanvas: ElementRef;
  
  async InitiatePlatformIfReady() {
    try {
      const {data} = await axios.get(`${this.AQI_BASE_URL}/latest`);
      this.setCanvas(this.gaugeCanvas.nativeElement);
      this.setImgSrc(this.GAUGE_IMG);
      this.renderGauge(data.aqi.realTime, data.category.realTime);
      this.emitData(data.aqi.realTime);
    } catch (e) {
      console.log("Unable to get latest aqi.")
      return Promise.reject(e);
    }

    this.subGaugeResize();
  }

  emitData(aqi: Number) {
    let statement = "";
    if (aqi <= 50) {
      statement = "If you can go outside, GO OUTSIDE, no real pollution concern";
    } else if (aqi <= 100) {
      statement = 'Carry your inhaler, it is a “lovely” day!';
    } else if (aqi <= 150) {
      statement = "Go outside if you need to, but be cautious about exercising";
    } else if (aqi <= 200) {
      statement = "It’s a good day for Netflix, it’s a bad day for your lungs! Everyone will experience negative health effects";
    } else {
      statement = "bruh"
    }

    this.outputStatement.emit(statement);
  }

  subGaugeResize() {
    const resize = () => this.resize()
    const debouncedRerender = debounce(resize.bind(this), 250, false);
    this.platform.resize.subscribe(debouncedRerender);
  }

  setCanvas(canvas: any) {
    this.canvas = canvas;
}

setImgSrc(imgSrc: any) {
    this.imgSrc = imgSrc;
}

renderGauge(aqi: any, rating: any) {
    this.AQI = aqi;
    this.RATING = rating;
    const ctx = this.getCanvasContext(this.canvas);
    const img = new Image();
    img.src = this.imgSrc;

    const onload = () => this.drawImage(ctx, img, aqi, rating);
    img.onload = onload.bind(this);
}

resize() {
    this.renderGauge(this.AQI, this.RATING);
}

private drawImage(ctx: any, img: any, aqi: any, rating: any) {
    ctx.drawImage(img, 0, 0, this.WIDTH, this.HEIGHT);
    this.setMarker(ctx, aqi);
    this.setText(ctx, aqi, rating);
}

private getCanvasContext(canvas) {
    const CLIENTWIDTH = document.querySelector(".center").clientWidth;
    this.WIDTH = CLIENTWIDTH > this.MAX_WIDTH ? this.MAX_WIDTH : CLIENTWIDTH;
    this.HEIGHT = this.WIDTH;

    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;

    const ctx = canvas.getContext("2d");
    ctx.scale(1,1); //Rescale the size
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT); // Reset Canvas

    return ctx;
};

private setMarker(ctx, aqi) {
    ctx.save();
    ctx.translate(this.WIDTH * 0.5, this.HEIGHT * 0.5);
    ctx.fillStyle = "#555";

    const degrees = this.calculateDegrees(aqi);
    this.rotateMarker(ctx, degrees);

    ctx.fillRect(0, 0, this.WIDTH/12.2, this.HEIGHT/60);
    ctx.restore();
};

private setText(ctx, aqi, rating) {
    ctx.save();
    ctx.font = "4em Overlock";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    ctx.fillText(String(aqi), this.WIDTH*0.5, this.HEIGHT*0.5+15);
    ctx.font = "2.5em Overlock";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    ctx.fillText(rating, this.WIDTH*0.5, (this.HEIGHT*0.5)+100);
    ctx.restore();
}

private rotateMarker(ctx, degrees) {
    for (let i = 0; i < degrees-1; i++) {
        ctx.transform(this.COS, this.SIN, -this.SIN, this.COS, 0, 0);
    }
    ctx.transform(this.COS, this.SIN, -this.SIN, this.COS, this.WIDTH/2.6, 0);
}

private calculateDegrees(aqi) {
    const aqi_norm = (aqi < 0) ? 0 : aqi;
    const scale = (aqi_norm > this.MAX_AQI) ? 1 : (aqi_norm / this.MAX_AQI);
    return Math.round(((this.HIGH_DEGREE - this.MIN_DEGREE) * scale) + this.MIN_DEGREE);
};


}  

let debounce = (func, wait, immediate) => {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};
