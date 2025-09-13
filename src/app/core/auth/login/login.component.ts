import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  msg: string = '';
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();
  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  submitform(): void {
    this.isLoading = true;
    this.subscription.unsubscribe();
    if (this.loginform.valid) {
      this.subscription = this.AuthService.loginform(
        this.loginform.value
      ).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'success') {
            this.cookieService.set('token', res.token);
            this.router.navigate(['/home']);
          }
        },

        error: (err: any) => {
          this.msg = err.error.message;
          this.isLoading = false;
        },
      });
      this.isLoading = false;
    } else {
      console.log('Form is invalid');
    }
  }
}
