import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent {

  constructor(
    private location: Location,
    private router: Router
  ) {}

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.router.navigate(['questions']);
  }
}
