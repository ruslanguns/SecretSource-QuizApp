import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page404',
  template: `
    <div class="error-page">
      <app-card>
        <h2>Page not found</h2>
        <button
          type="button"
          (click)="goToLastPage()"
          class="btn info">
          Go back
        </button>
      </app-card>
    </div>
  `,
  styles: [
  ]
})
export class Error404Component {

  constructor(
    private location: Location
  ) { }

  goToLastPage() {
    this.location.back();
  }

}
