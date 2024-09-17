import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { AllContracts } from '../Models/all-contracts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.css'
})
export class ContractDetailsComponent implements OnInit {

contractDetails!: AllContracts ;
statusArray = ['انتظار', 'مقبول', 'مرفوض'];


constructor(private contract : ContractService, private activeRouter :ActivatedRoute) {  
}

ngOnInit(): void {
  this.loadContract();
}


loadContract(): void {
    this.activeRouter.paramMap.subscribe(params => {
      const id: any = params.get('id');
      if (id) {
        this.loadContractDetails(id);
      }
    });
  }

  loadContractDetails(id:any):void{
    this.contract.getById(id).subscribe({
      next: (response) => {
        this.contractDetails = response.data;        
      },
      error: (err) => {
        console.error('Error fetching service details', err);
      }
    })
  }
}
