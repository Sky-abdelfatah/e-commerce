import { Product } from './../../../core/models/product.interface';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../../features/cart/service/cart.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  addproductitemtocart(id: string): void {
    this.cartService.addproducttocart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastr.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.error('Cart error:', err);
      },
    });
  }
}
