import { UserService } from './../../users/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { ContractAddDTO } from '../Models/contract';
import { AllContracts } from '../Models/all-contracts';
import { User } from '../../auth/Models/user';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css',
})
export class ContractComponent implements OnInit {
  constructor(private allContracts: ContractService, private userService: UserService) {}

  user: User | null = null;
  contracts!: AllContracts[];
  filteredContracts: AllContracts[] = [] ;
  statusArray = ['انتظار', 'مقبول', 'مرفوض'];

  ngOnInit(): void {
    this.loadContracts();
    this.loadUser();
  }

  loadContracts(): void {
    this.allContracts.getAllContracts().subscribe({
      next: (res) => {
        this.contracts = res.data;
        // Set filteredContracts to be the same as contracts initially
        this.filteredContracts = [...this.contracts];
        console.log(res.data);
      },
      error: (err) => {},
    });
  }

  loadUser(): void {
    this.user = this.userService.getStoredUserData();
  }

  sortOrders(event: any): void {
    const sortType = event.target.value;

    if (sortType === 'new') {
      // Sort by newest first (assuming there's a date property like 'createdAt')
      this.filteredContracts = this.contracts.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB; // Newest first
      });
    } else if (sortType === 'old') {
      // Sort by oldest first
      this.filteredContracts = this.contracts.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA; // Oldest first
      });
    }
  }

  onFilter(filterType: string): void {
    console.log(filterType);

    // Always filter from the original `this.contracts` list, not the modified filtered list.
    switch (filterType) {
      case 'pending':
        this.filteredContracts = this.contracts.filter(contract => contract.status === 0);
        console.log(this.filteredContracts);
        break;

      case 'accepted':
        this.filteredContracts = this.contracts.filter(contract => contract.status === 1);
        console.log(this.filteredContracts);
        break;

      case 'rejected':
        this.filteredContracts = this.contracts.filter(contract => contract.status === 2);
        console.log(this.filteredContracts);
        break;

      default:
        // If no filter type is selected, reset to show all contracts
        this.filteredContracts = [...this.contracts];
        console.log(this.filteredContracts);
        break;
    }
  }

}
