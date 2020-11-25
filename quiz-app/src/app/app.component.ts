import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout [title]="title">
      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class AppComponent {
  title = 'Deutsch lernen - QuizApp';
}
