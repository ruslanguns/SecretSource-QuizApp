import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { minLengthArray } from '../../form-validations';
import { IQuestion } from '../../interfaces';
import {
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
  
  private onDestroy = new Subject<void>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter();
  @Input() resetFormOnSubmit?: boolean;

  categories = QuestionCategories;
  form: FormGroup;
  formSubmitted = false;
  isEdit = false;
  loading = false;
  questionId = 0;
  questionSelected?: IQuestion;
  isFormValid?: boolean = true;
  questionSelectedObs$ = this.store.select<IQuestion[]>('questions')
    .pipe(
      map((questions) =>
        questions.length && questions.filter((question) => question.id === this.questionId)[0]),
      tap((question) => {
        if (question) {
          this.questionSelected = question;
          this.form.patchValue(question);
          
          if (!this.answers.length) {
            for (const answer of question.answers) {
              answer && this.addAnswer();
            }
            this.answers.patchValue(question.answers);
          }
        }
      })
    );

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {

    this.form = this.fb.group({
      id: 0,
      question: ['', Validators.required],
      category: ['', Validators.required],
      status: false,
      answers: this.fb.array([], minLengthArray(2)),
    });

    this.questionService.getQuestions().pipe(takeUntil(this.onDestroy)).subscribe()

    this.activatedRoute.params.subscribe(({ id }) =>
      isNaN(id) || parseInt(id, 10) === 0
        ? (this.isEdit = false)
        : ((this.isEdit = true),
          (this.questionId = parseInt(id, 10)),
          this.questionSelectedObs$.pipe(takeUntil(this.onDestroy)).subscribe())
    );
  }

  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete();
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
    this.answers.removeAt(index);
  }

  submitForm() {
    this.formSubmitted = true;
    this.answers.markAllAsTouched();
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loading = true;
      const isValid = this.validateAtLeastOneTrulyAnswer();
      const questionForm = this.convertFormWithStatusAsBooleans();

      if (this.isEdit && this.questionSelected) {
        isValid && this.editQuestion(questionForm);
      } else {
        isValid && this.createNewQuestion(questionForm);
      }
      this.formSubmitted = false;
    }
  }

  private createNewQuestion(questionForm: IQuestion) {
    this.questionService.createQuestion(questionForm)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (question) => (
          this.toastr.clear(),
          this.toastr.success(`Question created successfully`),
          (this.loading = false),
          (this.resetFormOnSubmit && this.resetForm()),
          this.onSubmit.emit()
        ),
        (error) => (this.toastr.error(error), (this.loading = false))
      );
  }

  private editQuestion(questionForm: IQuestion) {
    this.questionService.editQuestion(this.questionId, questionForm)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        () => (
          this.toastr.clear(),
          this.toastr.success(`Question edited successfully`),
          (this.loading = false),
          this.onSubmit.emit()
        ),
        (error) => (this.toastr.error(error), (this.loading = false))
      );
  }

  private validateAtLeastOneTrulyAnswer() {
    let trulyAnswers = 0;
    for (const answer of this.form.value.answers) {
      if (answer.isCorrect) trulyAnswers++;
    }
    if (trulyAnswers === 0) {
      this.toastr.error('Should have at least one truly answer');
      this.loading = false;
      return false;
    } else {
      return true;
    }
  }
 
  private convertFormWithStatusAsBooleans() {
    const { status, ...questionForm } = this.form.value;
    status === 'true'
      ? (questionForm.status = true)
      : (questionForm.status = false);
    return questionForm as IQuestion;
  }

  private resetForm() {
    this.form.reset();
    while (this.answers.length !== 0) {
      this.answers.removeAt(0);
    }
  }
}
