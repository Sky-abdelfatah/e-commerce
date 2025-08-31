import { Router } from '@angular/router';
import { routes } from './../../../app.routes';
import { AuthService } from './../service/auth.service';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  msg: string = '';
  isLoading: boolean = false;
  registerform: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$'),
      ]),
    },
    { validators: this.confirmpassword }
  );
  confirmpassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  submitform(): void {
    this.isLoading = true;
    if (this.registerform.valid) {
      this.AuthService.registerform(this.registerform.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'success') {
            this.router.navigate(['/login']);
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
