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
  selectedFiles: File[] = [];
  router: any;

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
      buyerInstruction: ['', [Validators.required]]
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
        console.log(err);
      },
    });
  }

onFileSelect(event: any): void {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFiles = [];
    for (let file of event.target.files) {
      this.selectedFiles.push(file);
      console.log(this.selectedFiles);

    }
  }
}

onSubmit() {
  if (this.form.valid && this.selectedFiles.length > 0) {
  const formData = new FormData();
  formData.append('name', this.form.get('name')?.value);
  formData.append('categoryId', this.form.get('categoryId')?.value);
  formData.append('description', this.form.get('description')?.value);
  formData.append('initialPrice', this.form.get('initialPrice')?.value);
  formData.append('BuyerInstructions', this.form.get('buyerInstruction')?.value);
  this.selectedFiles.forEach((file, index) => {
    formData.append('Images', file, file.name);
  });

  this.newService.updateService(formData).subscribe(response => {
    console.log('Service added successfully:', response);
    Swal.fire({
      title: 'نجاح',
      text: 'تم ارسال طلب اضافة خدمة بنجاح',
      icon: 'success',
      confirmButtonText: 'موافق',
    });
    this.router.navigateByUrl('');
  }, error => {
    console.error('Error adding service:', error);
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
