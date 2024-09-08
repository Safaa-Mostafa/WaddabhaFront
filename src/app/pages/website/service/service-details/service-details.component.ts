import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  standalone: true,
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  service: any = {};  // This will hold the service details
  images: string[] = ["/assets/daman.png"];
  currentImage: string = '';
  currentIndex: number = 0;
  intervalId: any;

  constructor(private serviceService: ServiceService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe({
      next: (params) => {
        const id: any = params.get('id');
        this.serviceService.getId(id).subscribe({
          next: (response) => {
            this.service = response.data;
            this.images = this.service.images;  // Assuming `images` is an array in your API response
            this.currentImage = this.images[0];
            this.startAutoSwitch();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  startAutoSwitch(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 4000); // Switch image every 4 seconds
  }
}
