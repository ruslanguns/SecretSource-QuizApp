import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Role } from 'src/app/shared/enums/role.enum';
import { AuthService, StoreService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private authService: AuthService,
    private store: StoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select<boolean>('isAuthorized').pipe(
      take(1),
      tap((isAuthorized) => {
        if (!isAuthorized || this.authService.isAccessTokenExpired()) {
          this.router.navigate(['/auth/login']);
          this.authService.logout();
          return of(false);
        }

        const roles = route.data.roles as Role[];
        if (roles && !roles.some(role => this.authService.hasRole(role))) {
          this.router.navigate(['error', '404']);
          return of(false);
        }

        return of(true);
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.store.select<boolean>('isAuthorized').pipe(
      take(1),
      tap((isAuthorized) => {
        if (!isAuthorized || this.authService.isAccessTokenExpired()) {
          this.router.navigate(['/auth/login']);
          this.authService.logout();
          return of(false);
        }
        return of(true);
      })
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    return this.store.select<boolean>('isAuthorized').pipe(
      take(1),
      tap((isAuthorized) => {
        if (!isAuthorized || this.authService.isAccessTokenExpired()) {
          this.router.navigate(['/auth/login']);
          this.authService.logout();
          return of(false);
        }

        const roles = childRoute.data.roles as Role[];
        if (roles && !roles.some(role => this.authService.hasRole(role))) {
          this.router.navigate(['error', '404']);
          return of(false);
        }

        return of(true);
      })
    );
  }
}
