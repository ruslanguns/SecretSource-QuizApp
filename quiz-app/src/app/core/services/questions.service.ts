import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, take, tap } from 'rxjs/operators';
import { IQuestion } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable()
export class QuestionsService {
  
  apiUrl = environment.apiUrl;
  questions$ = this.store.select<IQuestion[]>('questions');

  constructor(
    private http: HttpClient,
    private store: StoreService,
  ) {
    this.getQuestions().subscribe();
  }

  createQuestion(question: IQuestion) {
    const url = `${this.apiUrl}/question`;
    return this.http.post(url, question)
      .pipe(
        catchError(this.handleError)
      )
  }

  getQuestions() {
    const url = `${this.apiUrl}/question`;
    return this.http.get<IQuestion[]>(url)
      .pipe(
        take(1),
        tap(questions => this.store.set('questions', questions)),
        catchError(this.handleError),
      ) 
  }

  deleteQuestion(id: number) {
    const url = `${this.apiUrl}/question/${id}`;
    return this.http.delete<IQuestion>(url)
      .pipe(
        take(1),
        catchError(this.handleError),
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
