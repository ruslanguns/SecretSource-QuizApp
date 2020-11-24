import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { passwordMatcher } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: passwordMatcher })
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.valid) {
      const { username, passwordGroup: { password }} = this.form.value;
      console.log({
        username, password
      })
    }
  }

}
