import 'core-js/es7/reflect';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
  })
export class GaugeService {
    private canvas: any;
    private imgSrc: any;

    constructor() {}

    setCanvas(canvas: any) {
        this.canvas = canvas;
    }

    setImgSrc(imgSrc: any) {
        this.imgSrc = imgSrc;
    }

    renderGauge(aqi) {
      const ctx = getCanvasContext(this.canvas);
      const img = new Image();
      img.src = this.imgSrc;
  
      img.onload = function() {
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
          setMarker(ctx, aqi);
      };
    }
  }
  

// Global Settings
const WIDTH = 500;
const HEIGHT = 500;
const MIN_DEGREE = 144;
const HIGH_DEGREE = 400;
const MIN_AQI = 0;
const MAX_AQI = 200;
const SIN = Math.sin(Math.PI / 180);
const COS = Math.cos(Math.PI / 180);

// Helper Functions
const getCanvasContext = (canvas) => {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext("2d");
    ctx.scale(1,1); //Rescale the size
    ctx.clearRect(0, 0, WIDTH, HEIGHT); // Reset Canvas

    return ctx;
};

const setMarker = (ctx, aqi) => {
    ctx.translate(WIDTH * 0.5, HEIGHT * 0.5);
    ctx.fillStyle = "#555";

    const degrees = calculateDegrees(aqi);
    rotateMarker(ctx, degrees);

    ctx.fillRect(0, 0, WIDTH/12.2, HEIGHT/60);
};

const rotateMarker = (ctx, degrees) => {
    for (let i = 0; i < degrees-1; i++) {
        ctx.transform(COS, SIN, -SIN, COS, 0, 0);
    }
    ctx.transform(COS, SIN, -SIN, COS, WIDTH/2.6, 0);
}

const calculateDegrees = (aqi) => {
    const aqi_norm = (aqi < 0) ? 0 : aqi;
    const scale = (aqi_norm > MAX_AQI) ? 1 : (aqi_norm / MAX_AQI);
    return Math.round(((HIGH_DEGREE - MIN_DEGREE) * scale) + MIN_DEGREE);
};
