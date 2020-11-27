import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services';
import { passwordMatcher } from 'src/app/shared/form-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: passwordMatcher })
    })
  }

  onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      const { username, passwordGroup: { password }} = this.form.value;
      this.authService.register(username, password).subscribe(
        () => (
          this.toastr.clear(),
          this.toastr.success('You are now registered'),
          this.router.navigate(['/auth/login'])
        ),
        (error) => (
          this.toastr.error(error),
          this.loading = false
        )
      );
    }
  }

}
