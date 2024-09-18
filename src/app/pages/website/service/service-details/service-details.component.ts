import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Image } from '../models/service';
import { User } from '../../auth/Models/user';
import { UserService } from '../../users/services/user.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css'],
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {
  service: any = {}; // This will hold the service details
  images: Image[] = []; // Array to hold image URLs
  currentImage: string = ''; // Current image being displayed
  currentIndex: number = 0; // Index of current image
  intervalId: any;
  user!: User | null;

  constructor(
    private serviceService: ServiceService,
    private activeRouter: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the service ID from the URL and fetch service details
    this.activeRouter.paramMap.subscribe((params) => {
      const id: any = params.get('id');
      if (id) {
        this.loadServiceDetails(id);
      }
    });
    this.loadUser();
  }

  // Fetch service details by ID
  loadServiceDetails(id: any): void {
    this.serviceService.getId(id).subscribe({
      next: (response) => {
        this.service = response.data;
        if (this.service.images && this.service.images.length > 0) {
          // Extract image URLs from response and set the first image
          this.images = this.service.images;
          this.currentImage = '';
          console.log('Images loaded:', this.images);
          console.log('Current Image:', this.currentImage);
          //this.startAutoSwitch();
          this.nextImage();
        } else {
          console.log('No images available');
        }
      },
      error: (err) => {
        console.error('Error fetching service details', err);
      },
    });
  }

  loadUser(): void {
    this.user = this.userService.getStoredUserData();
  }

  // Auto switch images
  // startAutoSwitch(): void {
  //   this.intervalId = setInterval(() => this.nextImage(), 4000);  // Switch every 4 seconds
  // }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.intervalId);
  }

  // Show previous image
  prevImage(): void {
    if (this.images.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.currentImage = this.images[this.currentIndex].imageUrl;
    }
  }

  // Show next image
  nextImage(): void {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex].imageUrl;
    }
  }
}
