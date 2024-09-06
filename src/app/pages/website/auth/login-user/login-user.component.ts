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

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,private service:AuthServiceService,private router:Router
  ) {}

form!: FormGroup;
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ]
    });

  }
  togglePasswordVisibility(): void {
      this.hidePassword = !this.hidePassword;
  }
  onSubmit() {
        if (this.form.valid) {
      this.service.Login(this.form.value).subscribe({
        next: (res) => {
          this.service.setToken(res.token);
          Swal.fire({
            title: 'نجاح',
            text: 'تم تسجيل الدخول بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق'
          });
            this.router.navigateByUrl('/layout');
        },
        error: (err) => {
          Swal.fire({
            title: 'An error occurred',
            text: 'Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

}
