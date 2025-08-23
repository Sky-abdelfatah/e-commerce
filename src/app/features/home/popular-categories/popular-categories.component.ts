import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Category } from '../../../core/models/category.interface';
import { Carousel } from 'flowbite';
@Component({
  selector: 'app-popular-categories',
  imports: [],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: Category[] = [];
  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
