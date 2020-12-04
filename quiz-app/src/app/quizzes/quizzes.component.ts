import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizzes',
  template: `
    <app-card class="m-1">
      <router-outlet></router-outlet>
    </app-card>
  `,
  styles: [
  ]
})
export class QuizzesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
