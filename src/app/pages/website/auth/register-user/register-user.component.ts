import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import Swal from 'sweetalert2';
import { User } from '../Models/user';
import { fileExtensionValidator, handleValidationErrors } from '../Validations/Validation';
import { UserService } from '../../users/services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  hidePassword = true;
  form!: FormGroup;
  userInfo!: User;
  imagePreview: string | ArrayBuffer | null = 'assets/user.png';
  imageValidErr!:string;
  constructor(
    private fb: FormBuilder,
    private service: AuthServiceService,
    private router: Router,
    private userService:UserService
  ) {}
ngOnInit(): void {
  this.initializeForm();
}
  private initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[\u0600-\u06FF\\s]+$'),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[\u0600-\u06FF\\s]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'),
        ],
      ],
      role: ['Buyer', Validators.required],
      image:[null,[Validators.required,fileExtensionValidator(['jpg','png','jpeg'])]],
      terms: [false, Validators.requiredTrue],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if(file.type == 'image/png' || file.type == 'image/jpg'||file.type == 'image/jpeg'){
    if (file) {
      this.form.patchValue({
        image: file
      });
      this.form.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }}
    else{
   this.imageValidErr = "file extension must jpg or png and jpeg";
    }
  }




  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('role', this.form.get('role')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('fname', this.form.get('fname')?.value);
      formData.append('lname', this.form.get('lname')?.value);
      formData.append('password', this.form.get('password')?.value);
      formData.append('username', this.form.get('username')?.value);
      const imageFile = this.form.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }
this.registerUser(formData);

    } else {
      Swal.fire({
        title: 'تحقق من المعلومات',
        text: 'يرجى التأكد من صحة جميع الحقول.',
        icon: 'warning',
        confirmButtonText: 'موافق',
      });
    }
  }

  private registerUser(user:any): void {
    this.service.register(user).subscribe({
      next: (res) => {
        this.service.setToken(res.data.token);
        this.userService.saveData();
        Swal.fire({
          title: 'تم إضافة المستخدم بنجاح',
          text: 'مرحبا بك، يمكنك الآن المتابعة.',
          icon: 'success',
          confirmButtonText: 'موافق',
        }).then(() =>{
          this.router.navigateByUrl('');
      });
      },
      error :(err)=> {
        const errorMessages = handleValidationErrors(err.error.errors);
        Swal.fire({
          title: 'حصل خطأ',
          text: `${errorMessages}`,
          icon: 'error',
          confirmButtonText: 'موافق',
        });
      },
    });
  }

}

















