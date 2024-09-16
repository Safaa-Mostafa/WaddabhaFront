import { Component } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { AllContracts } from '../Models/all-contracts';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.css'
})
export class ContractDetailsComponent {

contracts !: AllContracts[]
constructor(private contract : ContractService) {  
}
ngOnInit(): void {
  this.loadContracts();
}

loadContracts(): void {
  // this.contract.getId(id).subscribe({
  //   next: (res) => {
  //     this.contracts = res.data;
  //   },
  //   error: (err) => {},
  // });
}
}
