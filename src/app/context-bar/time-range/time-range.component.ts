import { Component, OnInit } from '@angular/core';
import { Place } from '../../place';
@Component({
    selector: 'app-time-range',
    templateUrl: './time-range.component.html',
    styleUrls: ['./time-range.component.scss']
})

export class TimeRangeComponent implements OnInit {
    weekStartTimes: Date[] = [];
    weekEndTimes: Date[] = [];

    constructor() {
    }

    ngOnInit() {
        let t1 = new Date();
        let t2 = new Date();
        // this.weekStartTimes = [t1, t1, t1, t1, t1, t1, t1];
        // this.weekEndTimes = [t2, t2, t2, t2, t2, t2, t2];
        for (let i = 0; i < 7; i++) {
            t1 = new Date();
            t2 = new Date();
            t1.setDate(5 + Math.random() * 6);
            t1.setHours((Math.random() * 10) + 1);
            t2.setHours((Math.random() * 10) + 13);

            this.weekStartTimes.push(t1);
            this.weekEndTimes.push(t2);
        }
    }


}


