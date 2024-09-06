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

  constructor(
    private fb: FormBuilder,
    private service: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initializes the form with validation rules
  private initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      fName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_])[\u0600-\u06FF\\sA-Za-z\\d]+$')
        ]
      ],
      lName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[\u0600-\u06FF\\s]+$')
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')
        ]
      ],
      terms: [false, Validators.requiredTrue],
      role: ['buyer', Validators.required]
    });
  }

  // Toggles password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Handles form submission
  onSubmit(): void {
    if (this.form.valid) {
      this.userInfo = this.form.value as User;
      this.registerUser(this.userInfo);
    } else {
      Swal.fire({
        title: 'تحقق من المعلومات',
        text: 'يرجى التأكد من صحة جميع الحقول.',
        icon: 'warning',
        confirmButtonText: 'موافق'
      });
    }
  }

  // Calls the registration service and handles responses
  private registerUser(user: User): void {
    this.service.register(user).subscribe({
      next: (res) => {

          Swal.fire({
            title: 'تم إضافة المستخدم بنجاح',
            text: 'مرحبا بك، يمكنك الآن المتابعة.',
            icon: 'success',
            confirmButtonText: 'موافق'
          }).then(() => this.router.navigateByUrl('/login'));
        }
      ,
      error: (err) => {
        Swal.fire({
          title: 'حصل خطأ',
          text: 'حاول مرة تانية بعد شوية.',
          icon: 'error',
          confirmButtonText: 'موافق'
        });
      }
    });
  }
}
