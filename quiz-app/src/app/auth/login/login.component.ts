import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe(
        () => {
          this.toastr.clear();
          this.loading = false;
          return this.authService.redirectUrl
            ? this.router.navigate([this.authService.redirectUrl])
            : this.router.navigate(['/'])
        },
        (error) => (this.toastr.error(error), this.loading = false)
      );
    }
  }
}
