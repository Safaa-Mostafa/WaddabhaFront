import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../Services/auth-service.service';
import { handleValidationErrors } from '../Validations/Validation';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthServiceService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.initialForm();
  }

  initialForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // 6-digit OTP
      password: ['', [Validators.required]], // Add more validators if needed
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loadingService.startLoading();

      this.service.verify(this.form.value).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'نجاح',
            text: 'تم إعادة تعيين كلمة المرور بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.loadingService.stopLoading();

          this.router.navigateByUrl('/login');
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
