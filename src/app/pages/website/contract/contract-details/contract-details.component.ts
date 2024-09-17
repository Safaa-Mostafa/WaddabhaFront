import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { AllContracts } from '../Models/all-contracts';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../users/services/user.service';
import { User } from '../../auth/Models/user';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.css'
})
export class ContractDetailsComponent implements OnInit {

  contractDetails!: AllContracts;
  statusArray = ['انتظار', 'مقبول', 'مرفوض'];
  user!: User | null;

  constructor(private contract: ContractService, private activeRouter: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadContract();
    this.loadUser();
  }


  loadContract(): void {
    this.activeRouter.paramMap.subscribe(params => {
      const id: any = params.get('id');
      if (id) {
        this.loadContractDetails(id);
      }
    });
  }

  loadUser(): void {
    this.user = this.userService.getStoredUserData();
  }

  navigateToChatRoom(): void {
    this.router.navigate(['/messages'], { state: { chatRoomId: this.contractDetails.chatRoomId } });
  }

  acceptContract(): void {
    const confirm = window.confirm("هل أنت متأكد أنك تريد قبول هذا الطلب؟");
    if (confirm) {
      this.contract.acceptContract(this.contractDetails.id).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'نجاح',
            text: 'تم قبول الطلب بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.ngOnInit();
        }
      });
    }
  }

  rejectContract(): void {
    const confirm = window.confirm("هل أنت متأكد أنك تريد رفض هذا الطلب؟");
    if (confirm) {
      this.contract.rejectContract(this.contractDetails.id).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'نجاح',
            text: 'تم رفض الطلب بنجاح',
            icon: 'success',
            confirmButtonText: 'موافق',
          });
          this.ngOnInit();
        }
      });
    }
  }

  loadContractDetails(id: any): void {
    this.contract.getById(id).subscribe({
      next: (response) => {
        this.contractDetails = response.data;
        console.log(response.data);
      },
      error: (err) => {
        console.error('Error fetching service details', err);
      }
    });
  }
}
