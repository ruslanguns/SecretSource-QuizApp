import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Input() title : string = '';
  showSidenav: boolean = false;

  handShake() {
    console.log('works!!!!');
  }

  toggleMenu() {
    this.showSidenav = !this.showSidenav;
  }

}
