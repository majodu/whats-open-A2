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
  constructor() { }

  ngOnInit() {
    this.place = new Place('Burger King', [new Date()],
      [new Date()], 'picture: string', 'open', 'The Johnson Center');

    if (this.place.status === 'open') {
      status = 'OPEN';
    } else {
      status = 'CLOSED';
    }

  }

}
