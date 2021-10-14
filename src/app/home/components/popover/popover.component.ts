import { Component, Input, ElementRef, ViewChild } from '@angular/core';


@Component({  
  selector: 'Popover',
  templateUrl: 'Popover.component.html',
  styleUrls: ['Popover.component.css'],
})


export class Popover {
  @Input() data;
  @Input() popover;
  @ViewChild('hiddenContent', {static: false}) hiddenContent: ElementRef;
  @ViewChild('hiddenContent1', {static: false}) hiddenContent1: ElementRef;

  className: string = 'popover_title_wrapper';
  col1: string = "slide-wrapper";
  col2: string = "slide-wrapper";
  col3: string = "slide-wrapper";
  col4: string = "slide-wrapper";
  items : any = [1,2,3,4,2,4,2,6,89,6,7654,43,3456,76,543];
  pollutantInfo: any;
  constructor() { 

  }
  ngOnInit(){
    this.setColor();
    this.setPollutantInfo();
    this.setHighlight();
  }
  dismiss() {
    this.popover.dismiss();
  }

showDeepDive(text){
  this.hiddenContent.nativeElement.hidden = false;
  console.log(text)
}
showDeepDive1(text){
  this.hiddenContent1.nativeElement.hidden = false;
  console.log()
}


  setHighlight(){
  switch(this.data.level){
      case "Very Unhealthy":
        this.col4 += " highlighted";
        break;
      case "Unhealthy":
        this.col3 += " highlighted";
        break;
      case "Moderate":
        this.col2 += " highlighted";
        break;
      case "Good":
        this.col1 += " highlighted";
        break;
      default:
        console.log("invalid level");
        break;
    }
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

  setPollutantInfo(){
    switch(this.data.label){
      case "PM2.5":
        this.pollutantInfo = this.PM25Info;
        break;
      case "PM10":
        this.pollutantInfo = this.PM10Info;
        break;
      case "O3":
        this.pollutantInfo = this.O3Info;
        break;
      case "NO2":
        this.pollutantInfo = this.NO2Info;
        break;
      default:
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAH');
    }
  }
  
  PM25Info: any = [{
    title:"What Is PM2.5/10? Or What is PM?",
    text:"Airborne particulate matter, also known as PM or particle pollution, is a mixture of extremely small particles and liquid droplets that can include acids, organic chemicals, metals, soil and dust particles, and biological matter such as fungal spores.",
    textDeepDive:"PM2.5 is extremely small particles and droplets of pollution that because of their small size can penetrate deeply into lungs. Smaller particles pose a health concern because they can be inhaled into and accumulate in the lungs. Particles less than 2.5 micrometers in diameter, called PM2.5 or “fine” particulate matter, pose the greatest health risks. Because of their small size (about 1/30th the width of a human hair), these tiny particles penetrate deeply into the lungs. PM10 are inhalable particles, with diameters that are generally 10 micrometers and smaller, and can get deep into your lungs and some may even get into your bloodstream."
  },{
    title:"Why It Matters",
    text:"Exposure to PM, particularly PM2.5, can cause or worsen a number of diseases and can cause death.  PM2.5 can increase your risk of the following:",
    list:["Lung irritation, coughing, and difficulty breathing","Asthma attacks and hospitalizations– especially children","Adverse birth outcomes, including premature births and low birth weight babies","Decreased lung function and impaired lung growth in children and teenagers","Increased blood pressure","Heart attacks and irregular heartbeat","Cancer","Death"],
    textDeepDive:"About one out of every three people in the USA is at risk of experiencing PM2.5 related health effects. Some people are more likely to be exposed to unhealthy levels of PM, and to suffer negative health effects. People at risk of higher exposure levels include those who work or are active outdoors and those who live near major sources, including large industry and major roadways.\n\nSome populations are more likely to have adverse health effects of PM. Individuals at risk include: infants, children-especially if very active during high pollution periods, people over 65 years of age, people with lung diseases such as asthma, chronic obstructive pulmonary disease (COPD), chronic bronchitis and emphysema, people with heart disease or diabetes, and those with lower incomes.",
    listDeepDive:["Avoid smoking and avoid breathing second-hand smoke.","Minimize open fires, the use of fireplaces, and replace wood-burning stoves with gas-powered versions.","Install particulate filters to reduce PM levels in your home, office, or school.","Support regulations that require installation of the best available technology at local steel mills and other PM-producing industries to help keep PM and many other harmful pollutants out of our air.","Reduce the number of polluting vehicles, by upgrading the diesel truck, bus and rail fleet, or retrofitting vehicles with diesel particulate traps.","Assure that industries and transport stations are not located near schools and residential areas.","Enforce diesel truck idling ordinances to reduce PM levels on roads and parking areas."]
  },{
    title:"Local Sources",
    text:"",
    list:["Dust from roads","Industrial processes","Fuel combustion","Power plants"],
    textDeepDive:"PM comes from many sources and is often too small to see directly with the human eye. Sometimes you can see a “haze” in the atmosphere that results from PM (and not humidity).  Outdoors, important sources include cars, trucks, trains, construction equipment, power plants, incinerators, fireplaces, burning leaves and brush, and some industrial processes.  “Coarse fraction” particulate matter, with a diameter between 2.5 and 10 micrometers, is due to crushing and grinding operations, as well as windblown dust from roads and fields. PM also results from chemical reactions involving combustion gases, organic vapors, ammonia and ozone.  Indoors, PM can come from cigarette smoking and cooking (especially frying), woodstoves, candles, or from outdoor air that comes into houses or buildings.",
  },{
    title:"What You Can Do",
    list:["Support regulations that require installation of the best available technology at local steel mills and other PM-producing industries to help keep PM and many other harmful pollutants out of our air.","Reduce the number of polluting vehicles, by upgrading the diesel truck, bus and rail fleet, or retrofitting vehicles with diesel particulate traps.","Assure that industries and transport stations are not located near schools and residential areas.","Enforce diesel truck idling ordinances to reduce PM levels on roads and parking areas.","Install particulate filters to reduce PM levels in your home, office, or school.","Avoid smoking and avoid breathing second-hand smoke.","Minimize open fires, the use of fireplaces, and replace wood-burning stoves with gas-powered versions."],
  },{
    title:"Pollutant Index",
  },{
    title:"References",
    text:"CAPHE Particulate Matter Fact Sheet",
    link:"https://caphedetroit.sph.umich.edu/project/pm2-5/"
  }];
  PM10Info: any = this.PM25Info;
  O3Info: any = [{
    title:"What Is O3?",
    text:"Ozone is a main part of “smog,” a haze that can persist for several days, decreasing visibility, and making it difficult to breathe.",
    textDeepDive:"Ozone pollution has been a serious problem in many urban areas, including Detroit. High levels of ozone are harmful to health, and also damage plants and materials such as paint and rubber. Ozone (O3) is formed by chemical reactions between nitrogen oxides (NOx) and volatile organic compounds (VOCs) in the presence of sunlight, creating ground-level ozone.\n\nOzone is also present high in the atmosphere, in the stratosphere where jet planes fly. Here, ozone is beneficial and needed because it removes harmful ultraviolet sunlight, keeping people safe from sunburns.  Ground level ozone does not migrate to the stratosphere. The presence of ozone closer to the ground, where people live, can cause serious health problems.",
  },{
    title:"Why It Matters",
    text:"Even at low levels, ozone can cause a number of respiratory and other health effects. Ozone increases your risk of the following:",
    list:["Difficulty breathing","Lung-related emergency room visits","Premature birth and smaller babies at birth","Brain damage and other birth defects","Possibility of early death","Hypertension during pregnancy","Lung diseases such as asthma and chronic obstructive pulmonary disease (COPD)"],
    textDeepDive:"Some groups are at risk of negative health effects due to higher levels of exposure to ozone pollution, these include those living near a major highway and those spending long hours outdoors. Children have the highest risk for developing health problems from ozone because their lungs are developing, and they spend more time outside when ozone levels can be highest. High ozone levels are also particularly unhealthy for people with existing respiratory diseases, such as asthma.  Other groups vulnerable to ozone pollution include older adults, people exercising or working outdoors, and people with cardiovascular disease because they can experience stronger adverse health effects to ozone pollution."
  },{
    title:"Local Sources",
    text:"",
    list:["Industrial Facilities","Power plants","Car and truck exhaust","Gasoline vapors",
    "Chemical solvents"]
  },{
    title:"What You Can Do",
    list:["Implement and enforce Southeast Michigan’s Council of Governments (SEMCOG’s) recommendation of incremental reductions of high-emitting polluting vehicles.","Increase the share of wind and solar energy using renewable portfolio standards or other policy actions.","Upgrade poorly controlled emission sources such as power plants and major boilers, or phase them out.","Increase transit options using efficient buses, bus rapid transit, and trains, which has the additional  benefit of reducing congestion.","Limit physical activity outdoors when the Air Quality Index (AQI) is unhealthy.","Avoid scheduling strenuous outdoor activity in the afternoon and/or early evening, as ozone levels tend to be higher at these times.","Conserve energy at home and in the office. Set your thermostat higher in the summer to use less electricity and reduce VOCs.","Use products containing VOCs sparingly (for example, paints and solvents), and read labels for proper use and disposal.","Participate in your local utilities’ load-sharing, energy conservation and alternative energy programs."],
  },{
    title:"Pollutant Index",
  },{
    title:"References",
    text:"CAPHE Ozone Fact Sheet",
    link:"https://caphedetroit.sph.umich.edu/project/ozone/"
  }];
  NO2Info: any = [{
    title:"What Is NO2?",
    text:"Nitrogen Dioxide (NO2) a highly reactive gas known as oxides of nitrogen or nitrogen oxides (NOx) that primarily get in the air from the burning of fuel. NO2 forms from emissions from cars, trucks and buses, power plants, and off-road equipment.",
    textDeepDive:"Nitrogen oxides are air pollutants that contain oxygen and nitrogen with the chemical abbreviations NO and NO2. Together, they are called NOx. When fossil fuels like oil, gas, and coal are burned at high temperatures, NOx is formed. Nitrogen dioxide (NO2) is a gas with an irritating odor. It absorbs light and leads to the yellow-brown haze sometimes seen over cities. It is one of the important parts of “smog” which contains ozone, another important pollutant.",
  },{
    title:"Why It Matters",
    text:"Studies have shown that NOx at even relatively low concentrations is associated with a variety of diseases and emergency room visits and is also associated with:",
    list:["Reduced lung function","Increased lung sickness","Hospital admissions","Lung-related emergency room visits","Poor birth outcomes such as underweight babies"],
    text2:"Ongoing research is also being conducted to determine whether  NOx can cause cancer.",
    textDeepDive:"Exposure to NOx can worsen heart disease, leading to increased hospital visits and early death.  NOx also reacts with ammonia, water vapor, and other compounds in the atmosphere to form small particles, including PM2.5, which can enter your lungs and cause or worsen lung disease."
  },{
    title:"Local Sources",
    list:["Diesel vehicles","Gasoline cars and trucks","Power plants","Diesel construction equipment","Gas heating","Garbage incineration","Airplane emissions"],
    textDeepDive:"Most NO2 emissions in Detroit and southeast Michigan come from mobile sources, including cars, trucks, construction equipment, trains, boats, and aircraft. Other important sources include industrial and residential fuel combustion, such as factory boilers, garbage incinerators, and refineries. Some of the highest levels of NOx are found near major roadways, within about 300 feet. In fact, in-vehicle levels can be much higher than levels that are measured at area-wide monitors. Industrial sources also cause important local impacts, though the manufacturing industry does not account for a large part of NOx released in Detroit."
  },{
    title:"What You Can Do",
    list:["Encourage local officials to implement strategies that limit exposure to NOx and other pollutants.","Encourage regional and national policy and decision makers to enact and enforce legislation that promotes clean air.  These actions can reduce exposure to NOx and improve health for all people.","Avoid being near highways during peak driving hours.","Carpool, bicycle, walk or use public transportation to reduce the volume of traffic in the city.","Keep cars in good repair. NOx emissions may increase if your car’s “service engine” indicator is lit.  Newer cars emit less NOx and so are less polluting than older cars.","Join a community organization working to reduce pollution in Detroit (see caphedetroit.sph.umich.edu for a list of organizations)."],
  },{
    title:"Pollutant Index",
  },{
    title:"References",
    text:"CAPHE Nitrogen Oxides Fact Sheet",
    link:"https://caphedetroit.sph.umich.edu/project/nitrogen-oxides/"
  }];
}