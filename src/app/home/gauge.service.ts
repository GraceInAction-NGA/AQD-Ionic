import 'core-js/es7/reflect';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class GaugeService {
    private canvas: any;
    private imgSrc: any;

    private WIDTH = 500;
    private HEIGHT = 500;
    private MIN_DEGREE = 144;
    private HIGH_DEGREE = 400;
    private MIN_AQI = 0;
    private MAX_AQI = 200;
    private SIN = Math.sin(Math.PI / 180);
    private COS = Math.cos(Math.PI / 180);

    constructor() {}

    setCanvas(canvas: any) {
        this.canvas = canvas;
    }

    setImgSrc(imgSrc: any) {
        this.imgSrc = imgSrc;
    }

    renderGauge(aqi) {
      const ctx = this.getCanvasContext(this.canvas);
      const img = new Image();
      img.src = this.imgSrc;

      const a = function() {
        ctx.drawImage(img, 0, 0, this.WIDTH, this.HEIGHT);
        this.setMarker(ctx, aqi);
     };
  
      img.onload = a.bind(this);
    }

    private getCanvasContext(canvas) {
        canvas.width = this.WIDTH;
        canvas.height = this.HEIGHT;
    
        const ctx = canvas.getContext("2d");
        ctx.scale(1,1); //Rescale the size
        ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT); // Reset Canvas
    
        return ctx;
    };

    private setMarker(ctx, aqi) {
        ctx.translate(this.WIDTH * 0.5, this.HEIGHT * 0.5);
        ctx.fillStyle = "#555";

        const degrees = this.calculateDegrees(aqi);
        this.rotateMarker(ctx, degrees);

        ctx.fillRect(0, 0, this.WIDTH/12.2, this.HEIGHT/60);
    };

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