import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true })
  product: Product = {} as Product;
}
