import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { QuestionsService, StoreService } from 'src/app/core/services';
import { minLengthArray } from '../../form-validations';
import { IQuestion } from '../../interfaces';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnDestroy {
  form: FormGroup;
  formSubmitted = false;
  loading = false;

  isEdit = false;
  questionId = 0;
  questionSelected?: IQuestion;
  questionSelectedObs$ = this.store
    .select<IQuestion[]>('questions')
    .pipe(
      map(questions => // Find question by ID
        questions.filter(question => question.id === this.questionId)[0]),
      tap(question =>
        this.questionSelected = question)
    )
  questionSelectedSubs?: Subscription;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {
    this.activatedRoute.params.subscribe(({ id }) =>
      isNaN(id) || parseInt(id, 10) === 0
        ? (this.isEdit = false)
        : (this.isEdit = true, this.questionId = parseInt(id, 10))
    );

    this.form = this.fb.group({
      question: ['', Validators.required],
      category: ['', Validators.required],
      status: 0,
      answers: this.fb.array([], minLengthArray(2)),
    });

    if (this.isEdit) {
      this.questionSelectedSubs = this.questionSelectedObs$.subscribe()
    }
  }

  ngOnDestroy(): void {
    this.questionSelectedSubs?.unsubscribe;
  }

  buildAnswerForm() {
    return this.fb.group({
      answer: ['', Validators.required],
      isCorrect: false,
    });
  }

  addAnswer() {
    this.answers.push(this.buildAnswerForm());
  }

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.loading = true;

      let trulyAnswers = 0;
      for (const answer of this.form.value.answers) {
        if (answer.isCorrect) {
          trulyAnswers++;
        }
      }
      if (trulyAnswers === 0) {
        this.toastr.error('Should have at least one truly answer');
        this.loading = false;
        return;
      }

      const { status, ...questionForm } = this.form.value;
      status === '1'
        ? (questionForm.status = true)
        : (questionForm.status = false);

      this.questionService.createQuestion(questionForm).subscribe(
        () => (
          this.toastr.clear(),
          this.toastr.success(`Question created successfully`),
          this.resetForm(),
          (this.loading = false)
        ),
        (error) => (this.toastr.error(error), (this.loading = false))
      );
      this.formSubmitted = false;
    }
  }

  resetForm() {
    this.form.reset();
    while (this.answers.length !== 0) {
      this.answers.removeAt(0);
    }
  }
}
