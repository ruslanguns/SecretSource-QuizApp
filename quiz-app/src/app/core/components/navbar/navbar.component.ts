import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() isSidenavOpen = false;
  @Input() title = '';
    
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onToggleMenu() {
    this.toggleMenu.emit()
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }

}
