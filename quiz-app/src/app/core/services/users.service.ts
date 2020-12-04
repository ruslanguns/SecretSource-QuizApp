import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable()
export class UsersService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: StoreService,
    private toastr: ToastrService
  ) { }

  getUsers(): Observable<IUser[]> {
    const url = `${this.apiUrl}/user`;
    const usersCached = this.store.value.users;

    return !usersCached.length
      ? this.http.get<IUser[]>(url)
          .pipe(
            take(1),
            tap((users) => this.store.set('users', users)),
            catchError(this.handleError)
          )
      : this.store.select<IUser[]>('users')
  }

  refreshUsers() {
    const url = `${this.apiUrl}/user`;
    return this.http.get<IUser[]>(url)
      .pipe(
        take(1),
        tap((users) => {
          this.store.set('users', users);
          this.toastr.info('Users refreshed');
        }),
        catchError(this.handleError)
      )
  }

  deleteUser(id: number) {
    const url = `${this.apiUrl}/user/${id}`;
    if (id === this.store.value.currentUser?.id) {
      return throwError(`You are unable to delete yourself`);
    }
    return this.http.delete<IUser>(url)
      .pipe(
        take(1),
        tap((user) => {
          console.log(`user deleted => ${user}`)
          const users = this.store.value.users.filter((x) => x.id !== id);;
          console.log(users);
          this.store.set('users', users)
        }),
        catchError(this.handleError)
      )
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    err.error instanceof ErrorEvent
      ? (errorMessage = `An error occurred: ${err}`)
      : (errorMessage = `${err.status}: ${err.error.message}`);
    this.toastr.error(errorMessage)
    return throwError(errorMessage);
  }

}
