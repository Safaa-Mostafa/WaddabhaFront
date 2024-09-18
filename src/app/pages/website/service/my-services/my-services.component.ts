import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css',
})
export class MyServicesComponent implements OnInit {
  constructor(
    private servicesService: ServiceService,
    private loadingService: LoadingService
  ) {}

  services!: Service[];
  // statusEnglish = ["Pending", "Accepted", "Rejected"];
  // statusArray = ['انتظار', 'مقبول', 'مرفوض'];

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.loadServices();
  }
  loadServices(): void {
    this.servicesService.getMyServices().subscribe({
      next: (res) => {
        this.services = res.data;
        this.loadingService.stopLoading();
      },
    });
  }

  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    // Add half star if needed
    if (halfStars) {
      stars.push('half');
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }

    return stars;
  }
}
