import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject } from '@angular/core';
import { Brands } from '../../core/models/brands.interface';
import { BrandCardComponent } from '../../shared/components/brand-card/brand-card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pips/search-pipe';

@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent, FormsModule, SearchPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly brandsService = inject(BrandsService);
  brandlist: Brands[] = [];
  text: string = '';

  ngOnInit(): void {
    this.getAllBrandsData();
  }
  getAllBrandsData(): void {
    this.brandsService.getBrands().subscribe({
      next: (brands) => {
        this.brandlist = brands.data;
      },
      error: (error) => {},
    });
  }
}
