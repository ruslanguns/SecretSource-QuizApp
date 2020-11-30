import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IQuestion } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuestionsService {
  
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  createQuestion(question: IQuestion) {
    const url = `${this.apiUrl}/question`;
    return this.http.post(url, question)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
  }


  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    err.error instanceof ErrorEvent
      ? (errorMessage = `An error occurred: ${err}`)
      : (errorMessage = `Error code ${err.status}: ${err.error.message}`);
    return throwError(errorMessage);
  }
}
