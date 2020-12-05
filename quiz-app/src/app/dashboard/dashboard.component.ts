import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LoadingService, QuestionsService, QuizService, StoreService, UsersService } from '../core/services';
import { Role } from '../shared/enums/role.enum';
import { IQuestion, IQuiz, IUser } from '../shared/interfaces';
import { IQuizzesStats } from '../shared/interfaces/quizzes-stats.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent{
  Role = Role;
  questionFormModal = false;

  latestQuestions$: Observable<IQuestion[]> = combineLatest([
    this.questionService.getQuestions(),
    this.store.select<IQuestion[]>('questions')
  ])
    .pipe(
      map(([data, cached]) => cached),
      map(questions => questions && questions.sort((a: any, b: any) => (b.id - a.id))),
      map(questions => questions.slice(0, 5))
    );

  latestUsers$: Observable<IUser[]> = combineLatest([
    this.userservicce.getUsers(),
    this.store.select<IUser[]>('users')
  ])
    .pipe(
      map(([data, cached]) => cached),
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );

  answeredQuizzes$: Observable<IQuiz[]> = combineLatest([
    this.quizService.getAnsweredQuizzes(),
    this.store.select<IQuiz[]>('answeredQuizzes')
  ])
    .pipe(
      map(([data, cached]) => cached),
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );

  unansweredQuizzes$: Observable<IQuiz[]> = combineLatest([
    this.quizService.getUnansweredQuizzes(),
    this.store.select<IQuiz[]>('unansweredQuizzes')
  ])
    .pipe(
      map(([data, cached]) => cached),
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );

  quizzesStats$: Observable<IQuizzesStats> = this.store.select<IQuiz[]>('answeredQuizzes')
    .pipe(
      map(results => {
        let correct = 0;
        let incorrect = 0;
        for(const selectedAnswer of results) {
          selectedAnswer.selectedAnswer?.isCorrect ? correct++ : incorrect++
        }
        return { correct, incorrect }
      })
    );

  loading$ = this.loadingService.loadingSub.pipe(delay(0));
  
  constructor(
    private userservicce: UsersService,
    private questionService: QuestionsService,
    private quizService: QuizService,
    private loadingService: LoadingService,
    private store: StoreService
  ) {}

  openQuestionFormModal() {
    this.questionFormModal = true;
  }

  closeQuestionFormModal() {
    this.questionFormModal = false;
  }

  onSelectedQuiz(quiz: IQuestion|IQuiz) {
    this.store.set('selectedQuiz', quiz);
  }

}
