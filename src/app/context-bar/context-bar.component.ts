import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-context-bar',
 
  templateUrl: './context-bar.component.html',
  styleUrls: ['./context-bar.component.scss']
})
export class ContextBarComponent implements OnInit {
  show: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  private tempF =function(event){
    console.log(event);
  } 
}
