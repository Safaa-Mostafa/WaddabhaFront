import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../auth/Models/user';
import { AuthServiceService } from '../../auth/Services/auth-service.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  form!: FormGroup;
  userInfo!: User;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private service: AuthServiceService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
     this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || "";
      console.log(this.userId); 
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
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
      gender: ['', Validators.required],
    });
  }

  private loadUserData(): void {
    // Assuming you have a method to get the current user data
    // this.userService.getCurrentUser().subscribe({
    //   next: (user: User) => {
    //     this.userInfo = user;
    //     this.form.patchValue({
    //       fname: user.fname,
    //       lname: user.lname,
    //       gender: user.gender,
    //     });
    //   },
    //   error: () => {
    //     Swal.fire({
    //       title: 'خطأ',
    //       text: 'تعذر تحميل بيانات المستخدم.',
    //       icon: 'error',
    //       confirmButtonText: 'موافق',
    //     });
    //   }
    // });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value;
      // this.userService.updateUser(updatedUser).subscribe({
      //   next: () => {
      //     Swal.fire({
      //       title: 'تم التحديث بنجاح',
      //       text: 'تم حفظ التعديلات بنجاح.',
      //       icon: 'success',
      //       confirmButtonText: 'موافق',
      //     }).then(() => {
      //       this.router.navigateByUrl('');
      //     });
      //   },
      //   error: (err) => {
      //     Swal.fire({
      //       title: 'حصل خطأ',
      //       text: 'تعذر حفظ التعديلات.',
      //       icon: 'error',
      //       confirmButtonText: 'موافق',
      //     });
      //   }
      // });
    } else {
      Swal.fire({
        title: 'تحقق من المعلومات',
        text: 'يرجى التأكد من صحة جميع الحقول.',
        icon: 'warning',
        confirmButtonText: 'موافق',
      });
    }
  }
}
