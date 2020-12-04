import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { LoadingService, QuizService, StoreService } from 'src/app/core/services';
import { IQuestion, IQuiz } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesListComponent implements OnDestroy {
  
  private queryParamMap$ = this.activatedRoute.queryParamMap;
  private answeredQuizzes$ = this.quizService.getAnsweredQuizzes();
  private unansweredQuizzes$ = this.quizService.getUnansweredQuizzes();
  private onDestroy = new Subject<void>();
  
  filter$ = this.queryParamMap$.pipe(map(param => param.get('filter') === 'answered' ? 'answered' : 'unanswered'));
  loading$ = this.loadingService.loadingSub.pipe(delay(0));

  quizzesVM$: Observable<IQuiz[]> = combineLatest([
    this.filter$,
    this.answeredQuizzes$,
    this.unansweredQuizzes$,
  ]).pipe(
    map(([filter, answered, unanswered]) => {
      return filter === 'answered'
        ? (answered)
        : (unanswered)
    }),
  );

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private store: StoreService
    ) {
      this.quizService.getUnansweredQuizzes()
        .pipe(takeUntil(this.onDestroy))
        .subscribe();
      this.quizService.getAnsweredQuizzes()
        .pipe()
        .subscribe();
    }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onSelectedQuiz(quiz: IQuestion|IQuiz) {
    this.store.set('selectedQuiz', quiz);
  }
}
