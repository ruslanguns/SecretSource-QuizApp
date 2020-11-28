import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <app-card class="m-1">
      users works!
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
