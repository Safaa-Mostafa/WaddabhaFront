import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { handleValidationErrors } from '../Validations/Validation';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loadingService.startLoading();

      this.service.resetPassword(this.form.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'نجاح',
            text: res.data,
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.loadingService.stopLoading();
          this.router.navigateByUrl('verify');
        },
        error: (err) => {
          Swal.fire({
            title: 'حصل خطأ',
            text: handleValidationErrors(err.error.errors),
            icon: 'error',
            confirmButtonText: 'موافق',
          });
        },
      });
    }
  }
}
