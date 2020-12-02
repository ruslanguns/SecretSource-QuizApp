import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { minLengthArray } from '../../form-validations';
import { IAnswer, IQuestion } from '../../interfaces';
import {
  AnswersService,
  QuestionsService,
  StoreService,
} from 'src/app/core/services';
import { QuestionCategories } from '../../enums/categories';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnDestroy {

  @Output() onSubmit: EventEmitter<void> = new EventEmitter();
  categories = QuestionCategories;
  form: FormGroup;
  formSubmitted = false;
  isEdit = false;
  answersToRemove: IAnswer[] = [];
  answersToAdd: IAnswer[] = [];
  loading = false;
  questionId = 0;
  questionSelected?: IQuestion;
  questionSelectedObs$ = this.store.select<IQuestion[]>('questions')
    .pipe(
      map((questions) => {
        if (questions.length) {
          return questions.filter(
            (question) => question.id === this.questionId
          )[0];
        }
        return;
      }),
      tap((question) => {
        if (question) {
          this.questionSelected = question;
          this.form.patchValue(question);
          if (!this.answers.length) {
            for (const answer of question.answers) {
              if (answer) this.addAnswer();
            }
            this.answers.patchValue(question.answers);
          }
        }
      })
    );
  questionSelectedSubs?: Subscription;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private store: StoreService,
    private answerService: AnswersService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(({ id }) =>
      isNaN(id) || parseInt(id, 10) === 0
        ? (this.isEdit = false)
        : ((this.isEdit = true), (this.questionId = parseInt(id, 10)))
    );

    this.form = this.fb.group({
      id: 0,
      question: ['', Validators.required],
      category: ['', Validators.required],
      status: false,
      answers: this.fb.array([], minLengthArray(2)),
    });

    if (this.isEdit) {
      this.questionSelectedSubs = this.questionSelectedObs$.subscribe();
    }
  }

  ngOnDestroy(): void {
    this.questionSelectedSubs?.unsubscribe;
  }

  buildAnswerForm() {
    return this.fb.group({
      id: 0,
      answer: ['', Validators.required],
      isCorrect: false,
    });
  }

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.buildAnswerForm());
  }

  removeAnswer(index: number) {
    if (this.answers.length > 2) {
      if (this.isEdit) {
        const answer = this.answers.at(index).value;
        // Add to answersToRemoveArray
        answer.id !== 0 && this.answersToRemove.push(answer);
      }
      this.answers.removeAt(index);
    } else {
      this.toastr.info('You need to provide at least two answers');
    }
  }

  submitForm() {
    this.formSubmitted = true;
    this.answers.markAllAsTouched();
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loading = true;
      this.validateAtLeastOneTrulyAnswer();
      const questionForm = this.convertFormWithStatusAsBooleans();

      if (this.isEdit && this.questionSelected) {
        this.editQuestion(questionForm);
      } else {
        this.createNewQuestion(questionForm);
      }
      this.formSubmitted = false;
    }
  }

  private createNewQuestion(questionForm: IQuestion) {
    this.questionService.createQuestion(questionForm).subscribe(
      () => (
        this.toastr.clear(),
        this.toastr.success(`Question created successfully`),
        this.router.navigate(['questions']),
        (this.loading = false),
        this.onSubmit.emit()
      ),
      (error) => (this.toastr.error(error), (this.loading = false))
    );
  }

  private editQuestion(questionForm: IQuestion) {
    const { answers, ...question } = questionForm;
    const answerToEditObsArray: Observable<IAnswer>[] = [];
    const answersToRemoveObsArray: Observable<IAnswer>[] = [];
    const answerToCreateObsArray: Observable<IQuestion>[] = [];

    for(const answer of this.answersToRemove) {
      // To remove
      const answersObs = this.answerService.removeAnswer(answer.id);
      answersToRemoveObsArray.push(answersObs);
    }

    for (const answer of answers) {
      if (answer.id !== 0) {
        // To edit
        const answerObs = this.answerService.editAnswer(answer.id, answer);
        answerToEditObsArray.push(answerObs);
      } else {
        // To create
        const answerObs = this.questionService.addAnswerToQuestion(question.id, answer);
        answerToCreateObsArray.push(answerObs);
      }
    }

    combineLatest([
      this.questionService.editQuestions(this.questionId, question),
      ...answerToEditObsArray,
      ...answersToRemoveObsArray,
      ...answerToCreateObsArray,
    ]).pipe(
        map(([_question, ..._answers]) => {
          const { answers, ...questionEdited }: any = _question;
          this.form.patchValue(questionEdited);
          this.answers.patchValue(answers);
        })
      )
      .subscribe(
        () => {
          this.toastr.clear();
          this.toastr.success(`Sucessfuly edited`);
          this.loading = false;
          this.onSubmit.emit();
        },
        (error) => (this.toastr.error(error), (this.loading = false))
      );
  }

  private validateAtLeastOneTrulyAnswer() {
    let trulyAnswers = 0;
    for (const answer of this.form.value.answers) {
      if (answer.isCorrect) {
        trulyAnswers++;
      }
    }
    if (trulyAnswers === 0) {
      this.toastr.error('Should have at least one truly answer');
      this.loading = false;
      throw new Error('Should have at least one truly answer');
    }
  }
 
  private convertFormWithStatusAsBooleans() {
    const { status, ...questionForm } = this.form.value;
    status === 'true'
      ? (questionForm.status = true)
      : (questionForm.status = false);
    return questionForm as IQuestion;
  }

}
