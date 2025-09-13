import { Component, inject } from '@angular/core';
import { Category } from '../../core/models/category.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { SearchPipe } from '../../shared/pips/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [SearchPipe, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: Category[] = [];
  text: string = '';
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
