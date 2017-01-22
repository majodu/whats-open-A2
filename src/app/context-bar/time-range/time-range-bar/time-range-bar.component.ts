import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';

@Component({
  selector: 'app-time-range-bar',
  templateUrl: './time-range-bar.component.html',
  styleUrls: ['./time-range-bar.component.scss']
})
export class TimeRangeBarComponent implements OnInit {
  @Input() startTime: Date;
  @Input() endTime: Date;
  // blue bar x location and width
  barX: number;
  barWidth: number;

  // width between startTimeX and barX
  barStartWidth: number = 3;

  // width between the end of the bar and the endTextX location
  barEndWidth: number = 38;

  // text x locations
  startTimeTextX: number;
  endTimeTextX: number;

  dayOfWeek: string;
  week: string[] = ["SUN","MON","TUE", "WED", "THU", "FRI", "SAT"];

  constructor() { }

  ngOnInit() {
    // let time1 = new Date();
    // time1.setHours(9);
    // let time2 = new Date();
    // time2.setHours(18);
    // this.startTime = time1;
    // this.endTime = time2;
    this.barX = this.timeToPixel(this.startTime);
    this.barWidth = this.timeToPixel(this.endTime) - this.barX;
    this.startTimeTextX = this.barX + this.barStartWidth;
    this.endTimeTextX = this.barWidth + this.barX - this.barEndWidth;
    this.dayOfWeek = this.week[this.startTime.getDay()];

  }
  timeToPixel(date: Date): number {
    // this equals 304(the length of the ticks) divided by the amount of minutes in a day
    let pixelPerMinute = 0.2111111111111111;
    return 40 + ((date.getHours() * 60 + date.getMinutes()) * pixelPerMinute);
  }

}
