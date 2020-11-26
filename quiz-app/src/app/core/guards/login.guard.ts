import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { StoreService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivateChild {
  constructor(private store: StoreService, private router: Router) {}

  canActivateChild() {
    return (this.store.value.isLoggedIn)
      ? (this.router.navigate(['/']), false)
      : true;
  }
}
