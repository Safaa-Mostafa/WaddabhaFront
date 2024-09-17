import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { ContractAddDTO } from '../Models/contract';
import { AllContracts } from '../Models/all-contracts';
import { User } from '../../auth/Models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css',
})
export class ContractComponent implements OnInit {
  constructor(private allContracts: ContractService) {}

  user: User | null = null;
  contracts!: AllContracts[];
  filteredContracts: AllContracts[] = [];
  statusArray = ['انتظار', 'مقبول', 'مرفوض'];

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

  sortOrders(event: any) {
    const sortType = event.target.value;
    if (sortType == 'new') {
      //     this.sortedOrders = this.contracts.sort((a, b) => );
    } else if (sortType === 'old') {
      //     this.sortedOrders = this.contracts.sort((a, b) => //a.date.getTime() - b.date.getTime()//
      //     );
    }
  }

  onFilterPending(): void {
    this.filteredContracts = this.contracts.filter(
      (contract) => contract.status === 0
    );
  }

  onFilterAccept(): void {
    this.filteredContracts = this.contracts.filter(
      (contract) => contract.status === 1
    );
  }

  onFilterReject(): void {
    this.filteredContracts = this.contracts.filter(
      (contract) => contract.status === 2
    );
  }
  // onFilterEnd(): void {
  //   this.filteredContracts = this.contracts.filter(
  //     (contract) => contract.status === 
  //   );}
  

}
