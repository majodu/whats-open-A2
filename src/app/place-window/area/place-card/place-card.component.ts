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
    let t1 = new Date();
    let t2 = new Date();
    let weekStartTimes: Date[] = [];
    let weekEndTimes: Date[] = [];

    for (let i = 0; i < 7; i++) {
      t1 = new Date();
      t2 = new Date();
      t1.setDate(5 + Math.random() * 6);
      t1.setHours((Math.random() * 10) + 1);
      t2.setHours((Math.random() * 10) + 13);

      weekStartTimes.push(t1);
      weekEndTimes.push(t2);
    }
    this.place = new Place('Burger King', weekStartTimes,
      weekEndTimes, 'picture: string', 'open', 'The Johnson Center');

    let todaysDate = this.place[new Date().getDay()];
    console.log(todaysDate);

    if (this.place.status === 'open') {
      this.status = 'OPEN';
    } else {
      this.status = 'CLOSED';
    }

  }

}
