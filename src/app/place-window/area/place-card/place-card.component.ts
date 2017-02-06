import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {
  @Input() private place: Place;
  private status: string;
  private week: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  constructor() { }

  ngOnInit() {
    let weekOpenTimes: number[][] = [];
    let weekCloseTimes: number[][] = [];

    for (let i = 0; i < 7; i++) {
      const hour1 = Math.floor(Math.random() * 24);
      const minute1 = Math.floor(Math.random() * 60);
      const hour2 = Math.floor(Math.random() * 24);
      const minute2 = Math.floor(Math.random() * 60);
      weekOpenTimes.push([hour1, minute1]);
      weekCloseTimes.push([hour2, minute2]);
    }
    this.place = new Place('Burger King', weekOpenTimes,
      weekCloseTimes, 'picture: string', 'The Johnson Center');

      this.status = 'OPEN';
  
}
  //if t1 is bigger than t2 it returns true ;
  private time_between = function (t1: number[], t2: number[]): boolean {
    // multiplying hours by 60 and adding minutes
    const t1_minutes = t1[0] * 60 + t1[1];
    const t2_minutes = t2[0] * 60 + t2[1];


    if (t1_minutes > t2_minutes) {
      return true;
    }
    return false;
  }
}