import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-hide-arrow',
  templateUrl: './show-hide-arrow.component.html',
  styleUrls: ['./show-hide-arrow.component.scss']
})
export class ShowHideArrowComponent implements OnInit {
  @Input() isRight: boolean;
  private arrow: string;
  private show: boolean;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.show = this.isRight;
    if (this.isRight) {
      this.arrow = ''; // arrow pointing right
      this.change.emit(true);
    } else {
      this.arrow = ''; // arrow pointing left
      this.change.emit(false);
    }

  }
  onClick = function (event) {
    this.show = !this.show;
    if (this.show) {
      this.arrow = ''; // arrow pointing right
      this.change.emit(true);
    } else {
      this.arrow = ''; // arrow pointing left
      this.change.emit(false);
    }
  }
}
