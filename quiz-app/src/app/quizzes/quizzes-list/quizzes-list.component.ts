import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoadingService, QuizService, StoreService } from 'src/app/core/services';
import { IQuestion, IQuiz } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-quizzes-list',
  templateUrl: './quizzes-list.component.html',
  styleUrls: ['./quizzes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesListComponent {
  
  private queryParamMap$ = this.activatedRoute.queryParamMap;
  private answeredQuizzes$ = this.quizService.getAnsweredQuizzes();
  private unansweredQuizzes$ = this.quizService.getUnansweredQuizzes();
  
  filter$ = this.queryParamMap$.pipe(map(param => param.get('filter') === 'answered' ? 'answered' : 'unanswered'));
  loading$ = this.loadingService.loadingSub.pipe(delay(0));

  quizzesVM$: Observable<IQuiz[]> = combineLatest([
    this.filter$,
    this.answeredQuizzes$,
    this.store.select<IQuiz[]>('answeredQuizzes'),
    this.unansweredQuizzes$,
    this.store.select<IQuiz[]>('unansweredQuizzes')
  ]).pipe(
    map(([filter, fetchAnswers, answersStored, fetchUnanswered, unansweredStored]) => {
      return filter === 'answered'
        ? (answersStored)
        : (unansweredStored)
    }),
  );

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private store: StoreService
    ) { }

  onSelectedQuiz(quiz: IQuestion|IQuiz) {
    this.store.set('selectedQuiz', quiz);
  }
}
