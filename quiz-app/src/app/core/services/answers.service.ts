import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { IAnswer } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnswersService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  editAnswer(id: number, answer: IAnswer): Observable<IAnswer> {
    const url = `${this.apiUrl}/answer/${id}`;
    return this.http.put<IAnswer>(url, answer)
      .pipe(
        take(1),
        catchError(this.handleError),
      );
  }

  removeAnswer(id: number): Observable<IAnswer> {
    const url = `${this.apiUrl}/answer/${id}`;
    return this.http.delete<IAnswer>(url)
      .pipe(
        take(1),
        catchError(this.handleError),
      );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    err.error instanceof ErrorEvent
      ? (errorMessage = `An error occurred: ${err}`)
      : (errorMessage = `Error code ${err.status}: ${err.error.message}`);
    return throwError(errorMessage);
  }
}
