import { Component, Input } from '@angular/core';
import { Category } from '../models/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input({ required: true }) category!: Category;

  get imageUrl(): string {
    return 'assets/' + this.category.imagePath;
  }
}
