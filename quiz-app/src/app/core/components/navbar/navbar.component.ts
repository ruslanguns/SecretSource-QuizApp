import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, StoreService } from '../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() isSidenavOpen = false;
  @Input() title = '';

  isAuthorized$: Observable<boolean>;
    
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: StoreService
  ) {
    this.isAuthorized$ = this.store.select<boolean>('isAuthorized');
  }

  ngOnInit(): void {
  }

  onToggleMenu() {
    this.toggleMenu.emit()
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
