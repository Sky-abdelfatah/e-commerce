import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  checkoutform!: FormGroup;
  id: string | null = null;
  ngOnInit(): void {
    this.initform();
    this.getcartid();
  }
  initform(): void {
    this.checkoutform = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, Validators.required],
        phone: [null, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
        city: [null, Validators.required],
      }),
    });
  }
  getcartid(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }
  submitform(): void {
    if (this.checkoutform.valid) {
      console.log(this.checkoutform.value);
      console.log(this.id);
      this.cartService
        .checkoutsession(this.id!, this.checkoutform.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            if (response.status === 'success') {
              window.open(response.url, '_self');
            }
          },

          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
