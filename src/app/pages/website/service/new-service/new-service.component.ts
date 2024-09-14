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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      images: [null, [Validators.required]],
      initialPrice: [0, [Validators.required]],
      buyerInstruction: ['', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]] // For the checkbox
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
        images: this.selectedImages // Ensure the patching works
      });
      console.log(this.form);
      this.form.get('images')?.updateValueAndValidity(); // Update validation
    }


}




onSubmit() {
  // Check form validity and ensure images are selected
  if (this.form.valid && this.selectedImages.length > 0) {
    const formData = new FormData();

    // Append form fields
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('categoryId', this.form.get('categoryId')?.value);
    formData.append('initialPrice', this.form.get('initialPrice')?.value);
    formData.append('BuyerInstructions', this.form.get('buyerInstruction')?.value);

    // Append images
    this.selectedImages.forEach((file, index) => {
      formData.append(`Images[${index}]`, file, file.name);
    });

    this.newService.addService(formData).subscribe({
      next: (res) => {
        console.log('Service added successfully', res);
      },
      error: (err) => {
        console.error('Error adding service', err);
      }
    });
  } else {
    // Handle form invalid scenario
    Swal.fire({
      text: 'يرجى ملء جميع الحقول المطلوبة وتحميل الصور',
      icon: 'error',
      confirmButtonText: 'موافق'
    });
  }
}


}

