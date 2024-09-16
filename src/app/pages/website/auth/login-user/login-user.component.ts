import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { UserService } from '../../users/services/user.service';
import { handleValidationErrors } from '../Validations/Validation';
import { log } from 'node:console';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router: Router,
    private userService:UserService
  ) {}

  form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit() {
    if (this.form.valid) {
      this.service.Login(this.form.value).subscribe({
        next: (res) => {
          this.service.setToken(res.data.token);
          this.userService.saveData();
          Swal.fire({
            title: 'نجاح',
            text: 'تم تسجيل الدخول بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.router.navigateByUrl('');
        },
        error: (err) => {
       console.log(err.error);
          Swal.fire({
            title: 'حصل خطأ',
            text: `rkfjnkrt`,
            icon: 'error',
            confirmButtonText: 'موافق',
          });
        },
      });
    }
  }
}
