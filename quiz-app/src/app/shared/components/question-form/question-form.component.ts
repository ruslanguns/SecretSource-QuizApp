import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { minLengthArray } from '../../form-validations';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  form: FormGroup;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      category: ['', Validators.required],
      status: '0',
      answers: this.fb.array([], minLengthArray(2)),
    });
  }

  ngOnInit(): void {
    
  }
  
  buildAnswerForm() {
    return this.fb.group({
      answer: ['', Validators.required],
      isCorrect: false
    })
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
      console.log(this.form.value);
      this.formSubmitted = false;
    }
  }

}
