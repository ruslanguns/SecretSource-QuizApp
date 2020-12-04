import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { IQuestion, IQuiz } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable()
export class QuizService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: StoreService,
    private toastr: ToastrService
  ) {}

  doQuiz(answerId: number): Observable<IQuiz> {
    const url = `${this.apiUrl}/quiz/answer/${answerId}`;
    return this.http.post<IQuiz>(url, {}).pipe(
      take(1),
      tap((answeredQuiz) => {
        const unansweredQuizzes = this.store.value.unansweredQuizzes.filter(x => (x.id !== answeredQuiz.quiz?.id));
        const answeredQuizzes = this.store.value.answeredQuizzes;
        answeredQuizzes.push(answeredQuiz);
        this.store.set('unansweredQuizzes', unansweredQuizzes);
        this.store.set('answeredQuizzes', answeredQuizzes);
      }),
      catchError(this.handleError)
    );
  }

  getAnsweredQuizzes(): Observable<IQuiz[]> {
    const url = `${this.apiUrl}/quiz/answered`;
    const answeredQuizzesCached = this.store.value.answeredQuizzes;
    return !answeredQuizzesCached.length
      ? this.http.get<IQuiz[]>(url).pipe(
          take(1),
          tap((answeredQuizzes) =>
            this.store.set('answeredQuizzes', answeredQuizzes)
          ),
          catchError(this.handleError)
        )
      : this.store.select<IQuiz[]>('answeredQuizzes');
  }

  refreshAnsweredQuizzes(): Observable<IQuiz[]> {
    const url = `${this.apiUrl}/quiz/answered`;
    return this.http.get<IQuiz[]>(url).pipe(
      take(1),
      tap((answeredQuizzes) => {
        this.store.set('answeredQuizzes', answeredQuizzes),
        this.toastr.info('Answered quizzes refreshed');
      }),
      catchError(this.handleError)
    );
  }

  getUnansweredQuizzes(): Observable<IQuiz[]> {
    const url = `${this.apiUrl}/quiz/unanswered`;
    const unansweredQuizzesCached = this.store.value.unansweredQuizzes;
    return !unansweredQuizzesCached.length
      ? this.http.get<IQuiz[]>(url).pipe(
          take(1),
          tap((unansweredQuizzes) =>
            this.store.set('unansweredQuizzes', unansweredQuizzes)
          ),
          catchError(this.handleError)
        )
      : this.store.select<IQuiz[]>('unansweredQuizzes');
  }

  refreshUnansweredQuizzes(): Observable<IQuestion[]> {
    const url = `${this.apiUrl}/quiz/unanswered`;
    return this.http.get<IQuestion[]>(url).pipe(
      take(1),
      tap((unansweredQuizzes) => {
        this.store.set('unansweredQuizzes', unansweredQuizzes);
        this.toastr.info('Unanswered quizzes refreshed');
      }),
      catchError(this.handleError)
    )
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    err.error instanceof ErrorEvent
      ? (errorMessage = `An error occurred: ${err}`)
      : (errorMessage = `${err.status}: ${err.error.message}`);
    this.toastr.error(errorMessage);
    return throwError(errorMessage);
  }
}
