import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  msg: string = '';
  isLoading: boolean = false;
  loginform: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
    ]),
  });

  submitform(): void {
    this.isLoading = true;
    if (this.loginform.valid) {
      this.AuthService.loginform(this.loginform.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'success') {
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
