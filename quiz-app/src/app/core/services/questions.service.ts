import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { IAnswer, IQuestion } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable()
export class QuestionsService {
  
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: StoreService,
  ) {
    this.getQuestions().subscribe();
  }

  createQuestion(question: IQuestion): Observable<IQuestion> {
    const url = `${this.apiUrl}/question`;
    return this.http.post<IQuestion>(url, question)
      .pipe(
        tap(newQuestion => {
          const questions = this.store.value.questions;
          questions.push(question);
          this.store.set('questions', newQuestion);
        }),
        catchError(this.handleError)
      )
  }

  getQuestions(): Observable<IQuestion[]> {
    const url = `${this.apiUrl}/question`;
    return this.http.get<IQuestion[]>(url)
      .pipe(
        take(1),
        tap(questions => this.store.set('questions', questions)),
        catchError(this.handleError),
      ) 
  }

  editQuestions(id: number, question: Partial<IQuestion>): Observable<IQuestion> {
    const url = `${this.apiUrl}/question/${ id }`;
    return this.http.put<IQuestion>(url, question)
      .pipe(
        take(1),
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

  addAnswerToQuestion(questionId: number, answer: IAnswer) {
    const url = `${this.apiUrl}/question/${questionId}/answer`;
    return this.http.post<IQuestion>(url, answer)
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
