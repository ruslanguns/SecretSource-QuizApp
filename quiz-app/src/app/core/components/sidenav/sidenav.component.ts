import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IMenuItems {
  title: string;
  url: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  @Input() show: boolean = false;
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();

  menuItems: IMenuItems[] = [
    {
      title: '',
      url: ''
    }
  ];

  toggleSidenav() {
    this.show = !this.show;
  }

  onBackgroundClick() {
    if (this.show) {
      this.toggleSidenav();
      this.toggleMenu.emit(this.show);
    }
  }

}
