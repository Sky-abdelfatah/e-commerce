import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pips/search-pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productslist: Product[] = [];
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;
  ngOnInit(): void {
    this.getAllProductsData();
  }
  getAllProductsData(pageNumber: number = 1): void {
    this.productsService
      .getProducts //pageNumber
      ()
      .subscribe({
        next: (products) => {
          this.productslist = products.data;

          // this.pageSize = products.metadata.limit;
          // this.p = products.currentPage;
          // this.total = products.results;
        },
        error: (error) => {},
      });
  }
}
