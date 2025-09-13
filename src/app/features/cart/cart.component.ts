import { RouterLink } from '@angular/router';
import { Cart } from './models/cart.interface';
import { CartService } from './service/cart.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartdetails: Cart = {} as Cart;
  gitloggeduserdata(): void {
    this.cartService.getloggedusercart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartdetails = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.gitloggeduserdata();
  }

  removeitem(id: string): void {
    this.cartService.removespeficcartitem(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cartdetails = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updatecount(id: string, count: number): void {
    this.cartService.updatecartcount(id, count).subscribe({
      next: (response) => {
        console.log(response);
        this.cartdetails = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
