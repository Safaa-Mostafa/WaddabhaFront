import { Component } from '@angular/core';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent {

constructor() {}

  // sortedOrders = [...this.contracts];

   sortOrders(event: any){
  //    const sortType = event.target.value;
  //    if (sortType == 'new'){
  //     this.sortedOrders = this.contracts.sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first
  //   } else if (sortType === 'old') {
  //     this.sortedOrders = this.contracts.sort((a, b) => a.date.getTime() - b.date.getTime()); // Oldest first
  //   }
   }

}
