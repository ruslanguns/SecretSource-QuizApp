import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoadingService, QuizService, StoreService } from 'src/app/core/services';
import { IQuestion, IQuizAnswered } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesListComponent {
  
  answeredQuizzes$ = this.store.select<IQuizAnswered[]>('answeredQuizzes');
  unansweredQuizzes$ = this.store.select<IQuestion[]>('unansweredQuizzes');
  queryParamMap$ = this.activatedRoute.queryParamMap;
  
  quizzesVM$ = combineLatest([
    this.queryParamMap$,
    this.answeredQuizzes$,
    this.unansweredQuizzes$,
  ]).pipe(
    map(([param, answered, unanswered]) => {
      return param.get('filter') === 'answered'
        ? answered
        : unanswered
    }),
  )
  loading$ = this.loadingService.loadingSub.pipe(delay(0));

  constructor(
    private store: StoreService,
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
    ) {
    this.quizService.getUnansweredQuizzes().subscribe();
    this.quizService.getAnsweredQuizzes().subscribe();

  }
}
