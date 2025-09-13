import { Router } from '@angular/router';
import { routes } from './../../../app.routes';
import { AuthService } from './../service/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);
  msg: string = '';
  isLoading: boolean = false;
  flag: boolean = true;

  ngOnInit(): void {
    this.initforme();
  }
  registerform!: FormGroup;

  initforme(): void {
    this.registerform = new FormGroup(
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
        rePassword: new FormControl('', [Validators.required]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{11}$'),
        ]),
      },
      { validators: this.confirmpassword }
    );
  }

  confirmpassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitform(): void {
    this.isLoading = true;
    if (this.registerform.valid) {
      this.AuthService.registerform(this.registerform.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.message === 'success') {
            this.router.navigate(['/login']);
          } else {
            this.registerform.markAllAsTouched();
            this.registerform.setErrors({ invalid: true });
            // this.registerform.get('rePassword')?.patchValue('');
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
