import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../landing/categories/models/category';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { ServiceService } from '../services/service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'] // Note: Corrected 'styleUrl' to 'styleUrls'
})
export class EditServiceComponent {
  form!: FormGroup;
  categories!: Category[];
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceCategory: CategoriesService,
    private newService: ServiceService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[\u0600-\u06FF\\s]+$')]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      categoryId: ['', [Validators.required]],
      images: [null, [Validators.required]],
      initialPrice: [50, [Validators.required]],
      buyerInstruction: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
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
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = []; // Reset file array
      this.imagePreviews = [];  // Reset image previews

      for (let file of files) {
        this.selectedFiles.push(file);  // Store original file object

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result); // Store base64 preview
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  onSubmit() {
    console.log('Form Value:', this.form.value);
    console.log('Selected Files:', this.selectedFiles);

    if (this.form.valid && this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('categoryId', this.form.get('categoryId')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('initialPrice', this.form.get('initialPrice')?.value);
      formData.append('BuyerInstructions', this.form.get('buyerInstruction')?.value);
      this.selectedFiles.forEach((file) => {
        formData.append('Images', file, file.name);
      });

      this.newService.updateService(formData).subscribe({
        next: (response) => {
          console.log('Service updated successfully:', response);
          Swal.fire({
            title: 'نجاح',
            text: 'تم تحديث الخدمة بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.router.navigateByUrl('profile');
        },
        error: (error) => {
          console.error('Error updating service:', error);
          Swal.fire({
            title: 'خطأ',
            text: 'حدث خطأ أثناء تحديث الخدمة',
            icon: 'error',
            confirmButtonText: 'موافق'
          });
        }
      });
    } else {
      Swal.fire({
        text: 'يرجى ملء جميع الحقول المطلوبة وتحميل الصور',
        icon: 'error',
        confirmButtonText: 'موافق'
      });
    }
  }
}
