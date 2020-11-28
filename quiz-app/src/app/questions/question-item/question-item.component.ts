import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent {

  constructor(
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
}
