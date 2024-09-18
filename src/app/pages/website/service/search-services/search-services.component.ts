import { Component } from '@angular/core';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-services',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './search-services.component.html',
  styleUrl: './search-services.component.css',
})
export class SearchServicesComponent {
  services: Service[] = [];
  searchParam: string = '';
  constructor(private service: ServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const paramValue = params['name'];
      if (paramValue) {
        this.searchParam = paramValue;
        this.loadServices(paramValue);
      }
    });
  }
  loadServices(name: string) {
    this.service.searchServices(name).subscribe({
      next: (res) => {
        this.services = res.data;
      },
      error: (err) => {
        console.error(err);
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
