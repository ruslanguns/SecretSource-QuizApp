import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoadingService, QuestionsService, QuizService, StoreService, UsersService } from '../core/services';
import { Role } from '../shared/enums/role.enum';
import { IQuestion, IQuizAnswered, IUser } from '../shared/interfaces';
import { IQuizzesStats } from '../shared/interfaces/quizzes-stats.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Role = Role;
  questionFormModal = false;

  latestQuestions$: Observable<IQuestion[]> = this.questionService.getQuestions()
    .pipe(
      map(questions => questions && questions.sort((a: any, b: any) => (b.id - a.id))),
      map(questions => questions.slice(0, 5))
    )
  latestUsers$: Observable<IUser[]> = this.userservicce.getUsers()
    .pipe(
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );
  answeredQuizzes$: Observable<IQuizAnswered[]> = this.quizService.getAnsweredQuizzes()
    .pipe(
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );
  unansweredQuizzes$: Observable<IQuestion[]> = this.quizService.getUnansweredQuizzes()
    .pipe(
      map(users => users && users.sort((a: any, b: any) => (b.id - a.id))),
      map(users => users.slice(0, 5))
    );
  quizzesStats$: Observable<IQuizzesStats> = this.answeredQuizzes$
      .pipe(
        map(results => {
          let correct = 0;
          let incorrect = 0;
          for(const selectedAnswer of results) {
            selectedAnswer.selectedAnswer.isCorrect
              ? correct++
              : incorrect++
          }
          return {
            correct, incorrect
          }
        })
      )
  loading$ = this.loadingService.loadingSub.pipe(delay(0));
  
  constructor(
    private userservicce: UsersService,
    private questionService: QuestionsService,
    private quizService: QuizService,
    private loadingService: LoadingService
  ) {}

  openQuestionFormModal() {
    this.questionFormModal = true;
  }

  closeQuestionFormModal() {
    this.questionFormModal = false;
  }

}
