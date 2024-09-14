import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { Category } from '../../landing/categories/models/category';
import { ServiceService } from '../services/service.service';
import { Service } from '../models/service';
import Swal from 'sweetalert2';

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
  selectedImages: File[] = [];

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

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImages = Array.from(event.target.files); 
      this.form.patchValue({
        images: this.selectedImages  
      });
    }
  }


     

  onSubmit() {
    if (this.form.valid) {

      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('categoryId', this.form.get('categoryId')?.value);
      formData.append('initialPrice', this.form.get('initialPrice')?.value);
      formData.append('buyerInstruction', this.form.get('buyerInstruction')?.value);

      this.selectedImages.forEach((file, index) => {
        formData.append(`images[${index}]`, file, file.name);
      });
console.log(formData);

      this.newService.addService(formData).subscribe({
        next: (res) => {
        },
        error: (err) => {
        }
      });
    } else {
      Swal.fire({
        text: 'حصل خطأ',
        icon: 'error',
        confirmButtonText: 'موافق'
      });
    }
  }
}

