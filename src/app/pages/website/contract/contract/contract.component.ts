import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { ContractAddDTO } from '../Models/contract';
import { AllContracts } from '../Models/all-contracts';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent implements OnInit{

constructor(private allContracts : ContractService) {}

 contracts !: AllContracts[]

 ngOnInit(): void {
  this.loadContracts();
}

loadContracts(): void {
  this.allContracts.getAllContracts().subscribe({
    next: (res) => {
      this.contracts = res.data;
    },
    error: (err) => {},
  });
}


 sortOrders(event: any){
   const sortType = event.target.value;
     if (sortType == 'new'){
  //     this.sortedOrders = this.contracts.sort((a, b) => );
      } else if (sortType === 'old') {
  //     this.sortedOrders = this.contracts.sort((a, b) => //a.date.getTime() - b.date.getTime()//
  //     );  
    }
  }
  }

