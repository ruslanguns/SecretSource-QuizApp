import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthLogin, IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';
import { Role } from 'src/app/shared/enums/role.enum';

@Injectable()
export class AuthService {
  apiUrl = environment.apiUrl;
  jwtHelperService = new JwtHelperService();
  redirectUrl: string  = '';

  constructor(private http: HttpClient, private store: StoreService) {}

  register(username: string, password: string): Observable<IUser> {
    const url = `${this.apiUrl}/user/registration`;
    return this.http
      .post<IUser>(url, { username, password })
      .pipe(take(1), catchError(this.handleError));
  }

  login(username: string, password: string): Observable<IAuthLogin> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http
      .post<IAuthLogin>(url, { username, password })
      .pipe(
        take(1),
        tap((data) => this.setUserSession(data)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeUserSession();
  }

  hasRole(role: Role): boolean {
    return (
      this.store.value.isAuthorized &&
      this.store.value.currentUser?.roles.includes(role)
    ) as boolean;
  }

  isAccessTokenExpired(): boolean {
    const accessToken = this.store.value.accessToken;
    if (!accessToken) {
      return true;
    }
    const isExpired = this.jwtHelperService.isTokenExpired(accessToken);
    return isExpired ? true : false;
  }

  private setUserSession({ user, accessToken }: IAuthLogin): void {
    this.store.set('currentUser', user);
    this.store.set('accessToken', accessToken);
    this.store.set('isAuthorized', true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
  }

  private removeUserSession(): void {
    this.store.set('currentUser', undefined);
    this.store.set('accessToken', undefined);
    this.store.set('isAuthorized', false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    err.error instanceof ErrorEvent
      ? (errorMessage = `An error occurred: ${err}`)
      : (errorMessage = `Error code ${err.status}: ${err.error.message}`);
    return throwError(errorMessage);
  }
}
