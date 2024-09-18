import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../landing/categories/services/categories.service';
import { Category, Service } from '../models/service';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css'],
})
export class AllServicesComponent implements OnInit {
  services: Service[] = [];
  cate!: Category;
  constructor(
    private service: ServiceService,
    private category: CategoriesService,
    private activeRouter: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.activeRouter.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      this.loadCatgeory(id);
      this.loadServices(id);
    });
  }
  loadServices(id: string) {
    this.service.getAllServices(id).subscribe({
      next: (res) => {
        this.services = res.data; // Assuming `res.data` contains the array of services
        
      },
      error: (err) => {
        console.error(err);
        // this.loadingService.stopLoading();
      },
    });
  }
  loadCatgeory(id: string) {
    this.category.getById(id).subscribe({
      next: (res) => {
        this.cate = res.data;
        this.loadingService.stopLoading();
      },
      error: (err) => {
        console.log(err);
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
