import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit {
  locations: Location[] = [];
  dayOfTheWeek: number;
  secondPic = '../assets/BKing.jpg';
  icon1 = '../assets/square.jpeg';
  icon2 = '../assets/Adobe.png';
  icon3 = '../assets/Fedex.jpg';
  gmuLogo = '../assets/GMU_PLogo_RGB.jpg';
  constructor() { }

  ngOnInit() {
    this.dayOfTheWeek = new Date().getDay();
    let date = new Date();
    let openTimes: Date[] = [date,
    date,
    date,
    date,
    date,
    date,
    date];
    let closeTimes: Date[] = [date,
    date,
    date,
    date,
    date,
    date,
    date];
    let picture = '../assets/JC.jpg';
    
    this.locations[0] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    this.locations[1] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    this.locations[2] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    // this.locations[3] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    // this.locations[4] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    // this.locations[5] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');
    // this.locations[6] = new Location('Easy Eats', openTimes, closeTimes, picture, 'open');

  }
}


