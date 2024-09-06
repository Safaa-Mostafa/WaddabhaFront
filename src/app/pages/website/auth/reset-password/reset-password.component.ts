import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private formBuilder: FormBuilder,private service:AuthServiceService,private router:Router) { }
form!:FormGroup;
ngOnInit() {
  this.intialForm();
}
  intialForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]})
    }
    onSubmit() {
      console.log(this.form.valid);
          if (this.form.valid) {
    
        this.service.register(this.form.value).subscribe({
          next: (res) => {
            if (res.apiStatus == false) {
              Swal.fire({
                title: 'حصل خطأ',
                text: res.message || 'حاول مرة تانية بعد شوية.',
                icon: 'error',
                confirmButtonText: 'موافق'
              });
              return; 
            }
            Swal.fire({
              title: 'تم إرسال الطلب بنجاح!',
              text: ' يرجى اتباع التعليمات لاستعادة كلمة المرور الخاصة بك.',
              icon: 'success',
              confirmButtonText: 'موافق'
            });
            
                this.router.navigateByUrl('/login');
          },
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
}
