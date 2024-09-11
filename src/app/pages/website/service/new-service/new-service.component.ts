import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { Category } from '../../landing/categories/models/category';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css',
})
export class NewServiceComponent implements OnInit {
  form!: FormGroup;
  categories!: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private serviceCategory: CategoriesService,
    private newService: ServiceService
  ) {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      category: '',
      images: [],
      price: '',
      buyerInstruction: '',
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.serviceCategory.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {},
    });
  }

  onSubmit() {
    this.newService.addService(this.form.value).subscribe({
      next: (res) => {},
      error: (err) => {},
    });
  }
}
