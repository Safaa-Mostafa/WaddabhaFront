import { Component, Input } from '@angular/core';
import { Category } from '../models/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Input({ required: true }) category!: Category;

  get imageUrl(): string {
    console.log(this.category?.image?.imageUrl);
    return this.category?.image?.imageUrl;
  }
}
