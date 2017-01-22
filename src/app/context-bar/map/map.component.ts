import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  apiKey: string = 'AIzaSyDErZWfk8iTlvVp9JAW8VcBYzN1MkL0V60';
  url: string =('https://www.google.com/maps/embed/v1/place?key=' + this.apiKey + '&q=Space+Needle,Seattle+WA');
  constructor() { }

  ngOnInit() {
  }

}
