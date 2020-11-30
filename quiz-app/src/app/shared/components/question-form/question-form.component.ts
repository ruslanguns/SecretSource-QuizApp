import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionsService } from 'src/app/core/services';
import { minLengthArray } from '../../form-validations';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent {
  form: FormGroup;
  formSubmitted = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionsService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      category: ['', Validators.required],
      status: 0,
      answers: this.fb.array([], minLengthArray(2)),
    });
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
          this.loading = false
        ),
        (error) => (
          this.toastr.error(error),
          this.loading = false
          )
      );
      this.formSubmitted = false;
    }
  }

  resetForm() {
    this.form.reset()
    while(this.answers.length !== 0) {
      this.answers.removeAt(0);
    }
  }
}
