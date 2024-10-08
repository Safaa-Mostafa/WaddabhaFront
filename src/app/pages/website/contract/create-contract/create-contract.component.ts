import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContractService } from '../services/contract.service';
import Swal from 'sweetalert2';
import { ContractAddDTO } from '../Models/contract';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../../shared/services/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-contract',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], // Import ReactiveFormsModule here
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'], // Corrected to 'styleUrls'
})
export class CreateContractComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.form = this.formBuilder.group({
      price: [0, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      workLocation: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.loadingService.startLoading();
      const contract = this.form.value as ContractAddDTO;
      contract.serviceId = this.route.snapshot.paramMap.get('id') || '';
      this.contractService.addContract(contract).subscribe({
        next: (res) => {
          Swal.fire({
            text: 'تم إضافة الطلب بنجاح',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.loadingService.stopLoading();
          this.router.navigateByUrl('/contracts');
        },
        error: (err) => {
          console.error('Error:', err); // Debug error response
          Swal.fire({
            text: 'An error occurred!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    } else {
      Swal.fire({
        text: 'Form is invalid. Please fill all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
