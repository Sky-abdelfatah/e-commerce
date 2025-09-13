import { CartService } from '../cart/service/cart.service';
import { Product } from './../../core/models/product.interface';
import { ProductDetailsService } from './services/product-details.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  id: string | null = null;
  Productdetails: Product = {} as Product;

  ngOnInit(): void {
    this.getproductid();
    this.getproductdetailsdata();
  }
  getproductid(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlparam) => {
        this.id = urlparam.get('id');
      },
    });
  }

  getproductdetailsdata(): void {
    this.productDetailsService.getproductdetails(this.id).subscribe({
      next: (res: any) => {
        this.Productdetails = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private readonly CartService = inject(CartService);
  addproductitemtocart(id: string): void {
    this.CartService.addproducttocart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
