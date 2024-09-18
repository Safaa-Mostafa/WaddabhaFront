import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { editUser } from '../../auth/Models/editUser';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  userInfo!: editUser;
  form!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  imageValidErr!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  // Initialize the form with default values
  private initializeForm(): void {
    this.form = this.fb.group({
      fname: [
        '', // Initialize with empty value
        [
          Validators.minLength(2),
          Validators.pattern('^[\u0600-\u06FF\\s]+$'), // Arabic letters only
        ],
      ],
      lname: [
        '',
        [
          Validators.minLength(2),
          Validators.pattern('^[\u0600-\u06FF\\s]+$'), // Arabic letters only
        ],
      ],
      image: [null],
    });
  }

  loadUserData(): void {
    this.userService.profile().subscribe({
      next: (res) => {
        this.userInfo = res.data;
        // Update form after user data is loaded
        if (this.userInfo) {
          this.form.patchValue({
            fname: this.userInfo.fname,
            lname: this.userInfo.lname,
          });
          if (this.userInfo.image?.imageUrl) {
            this.imagePreview = this.userInfo.image.imageUrl;
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loadingService.startLoading();
      const formData = new FormData();
      formData.append('fname', this.form.get('fname')?.value);
      formData.append('lname', this.form.get('lname')?.value);
      if (this.form.get('image')?.value) {
        formData.append('image', this.form.get('image')?.value);
      }
      this.userService.update(formData).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'نجاح',
            text: 'تم التحديث بنجاح',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 3000,
            timerProgressBar: true,
            showCloseButton: true,
          });
          this.userService.saveData();
          this.loadingService.stopLoading();
          this.router.navigateByUrl('/profile');
        },
        error: (err: any) => {
          Swal.fire({
            title: 'خطأ',
            text: 'حدث خطأ',
            icon: 'error',
            confirmButtonText: 'OK',
            showCloseButton: true,
          });
        },
      });
    } else {
      Swal.fire({
        title: 'تحقق من المعلومات',
        text: 'يرجى التأكد من صحة جميع الحقول.',
        icon: 'warning',
        confirmButtonText: 'موافق',
      });
    }
  }

  onFileChange(event: any): void {
    this.imageValidErr = ''; // Reset error message before handling new file
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageValidErr = 'الملف يجب أن يكون بصيغة jpg أو png أو jpeg';
    }
  }
}
