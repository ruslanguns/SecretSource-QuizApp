import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuizService, StoreService } from 'src/app/core/services';
import { IAnswer, IQuiz } from '../../interfaces';

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizModalComponent {
  isAnswered?: boolean;
  selectedAnswer?: IAnswer;

  selectedQuiz$: Observable<IQuiz> = this.store.select<IQuiz>('selectedQuiz')
    .pipe(
      tap(quiz => {
        quiz && quiz.hasOwnProperty('answeredAt')
          ? this.isAnswered = true
          : this.isAnswered = false
      })
    )

  constructor(
    private store: StoreService,
    private quizService: QuizService,
    private toastr: ToastrService
  ) { }

  onSelectedAnswer(answer: IAnswer) {
    this.selectedAnswer = answer;
  }

  undoAnswerSelected() {
    this.selectedAnswer = undefined;
  }

  submitQuiz(answer: IAnswer) {
    this.quizService.doQuiz(answer.id)
      .subscribe((quiz) => {
        quiz.selectedAnswer?.isCorrect
          ? this.toastr.success(`Your answer is correct`)
          : this.toastr.error(`Your answer is wrong, keep learning`)
        this.onClose();
      })
  }
  
  onClose() {
    this.store.set('selectedQuiz', null);
  }
}
