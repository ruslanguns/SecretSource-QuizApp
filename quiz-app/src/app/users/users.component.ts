import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <app-card class="m-1">
      <router-outlet></router-outlet>
    </app-card>
  `,
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
