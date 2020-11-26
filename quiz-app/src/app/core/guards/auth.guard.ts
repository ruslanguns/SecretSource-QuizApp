import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService, StoreService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private store: StoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select<boolean>('isLoggedIn').pipe(
      take(1),
      tap((isLoggedIn) => {
        if (!isLoggedIn || this.authService.isAccessTokenExpired()) {
          this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          this.authService.logout();
          return of(false);
        }
        this.authService.redirectUrl = state.url;
        return of(true);
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.store.select<boolean>('isLoggedIn').pipe(
      take(1),
      tap((isLoggedIn) => {
        if (!isLoggedIn || this.authService.isAccessTokenExpired()) {
          this.router.navigate(['/auth/login']);
          this.authService.logout();
          return of(false);
        }
        return of(true);
      })
    );
  }
}
