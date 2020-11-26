import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  @Input() show: boolean = false;
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidenav() {
    this.show = !this.show;
  }

  emitToggle() {
    if (this.show) {
      this.toggleSidenav();
      this.toggleMenu.emit(this.show);
    }
  }

  logout() {
    this.router.navigate(['/auth/login']);
    this.authService.logout();
  }

}
