import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  template: `
    <p>
      This page does not exist!
    </p>
  `,
  styles: [
  ]
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
