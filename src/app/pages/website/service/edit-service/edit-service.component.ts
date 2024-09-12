import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../landing/categories/models/category';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { ServiceService } from '../services/service.service';
import { Service } from '../models/service';
import Swal from 'sweetalert2';

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
    private newService: ServiceService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6) ,Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      description:  ['', [Validators.required, Validators.minLength(50)]],
      categoryId: ['', [Validators.required]],
      images: [[], [Validators.required]],
      initialPrice: [0, [Validators.required]],
      buyerInstruction : ['']
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
    if (this.form.valid){
      const service = this.form.value as Service;
      this.newService.updateService(service).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    }
    else {
      Swal.fire({
        text : 'حصل خطأ',
        icon: 'error',
          confirmButtonText: 'موافق'
      })
    }
  }
}
