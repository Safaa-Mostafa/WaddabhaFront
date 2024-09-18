import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { Category } from '../../landing/categories/models/category';
import { ServiceService } from '../services/service.service';
import Swal from 'sweetalert2';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-new-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css',
})
export class NewServiceComponent implements OnInit {
  form!: FormGroup;
  categories!: Category[];
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceCategory: CategoriesService,
    private newService: ServiceService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[\u0600-\u06FF\\s]+$'),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(20)]],
      categoryId: ['', [Validators.required]],
      images: [null, [Validators.required]],
      initialPrice: [50, [Validators.required]],
      buyerInstruction: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.getCategory();
  }

  getCategory() {
    this.serviceCategory.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loadingService.stopLoading();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelect(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = []; // Reset file array
      this.imagePreviews = []; // Reset image previews

      for (let file of files) {
        this.selectedFiles.push(file); // Store original file object

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
    if (this.form.valid && this.selectedFiles.length > 0) {
      this.loadingService.startLoading();
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('categoryId', this.form.get('categoryId')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('initialPrice', this.form.get('initialPrice')?.value);
      formData.append(
        'BuyerInstructions',
        this.form.get('buyerInstruction')?.value
      );
      this.selectedFiles.forEach((file) => {
        formData.append('Images', file, file.name);
      });

      this.newService.addService(formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'نجاح',
            text: 'تم ارسال طلب اضافة خدمة بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.loadingService.stopLoading();
          this.router.navigateByUrl('/service/myservices');
        },
        (error) => {
          console.error('Error adding service:', error);
        }
      );
    } else {
      Swal.fire({
        text: 'يرجى ملء جميع الحقول المطلوبة وتحميل الصور',
        icon: 'error',
        confirmButtonText: 'موافق',
      });
    }
  }
}
