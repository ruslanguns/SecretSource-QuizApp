import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  template: `  
    <app-card class="m-1">
      <router-outlet></router-outlet>
    </app-card>
  `,
  styles: [
  ]
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
