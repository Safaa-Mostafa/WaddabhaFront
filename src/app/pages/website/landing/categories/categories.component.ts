import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Category } from './models/category';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}
  categories!: Category[];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {},
    });
  }
}
