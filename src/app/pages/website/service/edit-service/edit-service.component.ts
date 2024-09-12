import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../landing/categories/models/category';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {
  form!: FormGroup;
  categories!: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private serviceCategory: CategoriesService,
    private updateService: ServiceService
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
    this.updateService.addService(this.form.value).subscribe({
      next: (res) => {},
      error: (err) => {},
    });
  }
}
