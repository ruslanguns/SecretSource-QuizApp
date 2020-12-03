import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, shareReplay, take, tap } from 'rxjs/operators';
import { IAnswer, IQuestion } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable()
export class QuestionsService {
  apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private store: StoreService,
    private toastr: ToastrService
  ) {}

  createQuestion(question: IQuestion): Observable<IQuestion> {
    const url = `${this.apiUrl}/question`;
    return this.http.post<IQuestion>(url, question).pipe(
      tap((newQuestion) => {
        const questions = this.store.value.questions;
        questions.push(question);
        this.store.set('questions', newQuestion);
      }),
      catchError(this.handleError)
    );
  }

  getQuestions(): Observable<IQuestion[]> {
    const url = `${this.apiUrl}/question`;
    const questionsCached = this.store.value.questions.length;
    
    return !questionsCached
      ? this.http.get<IQuestion[]>(url).pipe(
          take(1),
          tap((questions) => (
            this.store.set('questions', questions)
          )),
          catchError(this.handleError)
        )
      : this.store.select<IQuestion[]>('questions')
  }

  refreshQuestions() {
    const url = `${this.apiUrl}/question`;

    return this.http.get<IQuestion[]>(url).pipe(
      take(1),
      tap((questions) => {
        this.store.set('questions', questions);
        this.toastr.info('Questions refreshed');
      }),
      catchError(this.handleError),
    )
  }

  editQuestion(id: number, question: Partial<IQuestion>): Observable<IQuestion> {
    const url = `${this.apiUrl}/question/${id}`;
    return this.http.put<IQuestion>(url, question)
      .pipe(
        take(1),
        tap(question => {
          const questions = this.store.value.questions.filter(x => x.id !== question.id);
          questions.push(question)
          this.store.set('questions', questions);
        }),
        catchError(this.handleError)
      );
  }

  deleteQuestion(id: number) {
    const url = `${this.apiUrl}/question/${id}`;
    return this.http.delete<IQuestion>(url).pipe(
      tap(() => {
        const questions = this.store.value.questions.filter((x) => x.id !== id);
        this.store.set('questions', questions);
      }),
      take(1),
      catchError(this.handleError)
    );
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
