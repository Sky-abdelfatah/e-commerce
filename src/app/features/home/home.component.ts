import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { PopularCategoriesComponent } from './popular-categories/popular-categories.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { MainSliderComponent } from './main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    PopularCategoriesComponent,
    PopularProductsComponent,
    MainSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
