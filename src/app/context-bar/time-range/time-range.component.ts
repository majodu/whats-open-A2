import { Component, OnInit } from '@angular/core';
import { Time } from '../../time';
@Component({
    selector: 'app-time-range',
    templateUrl: './time-range.component.html',
    styleUrls: ['./time-range.component.scss']
})

export class TimeRangeComponent implements OnInit {
    days: string[][] = [['translate(40, 4.000000)', '237']];

    constructor() { }

    ngOnInit() {
        
    }
    timeToPixel(time: Time): number {
        let pixelPerMinute: number = 0.2111111111111111;
        let past12 = pixelPerMinute * 60 * 12;
        return 40 + ((time.hour * 60 + time.minute) * pixelPerMinute) + ((time.ampm == 'AM') ? 0 : past12);

    }

}
