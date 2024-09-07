import { Component } from '@angular/core';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent {
  images = [
    'assets/images/img1.jpg',
    'assets/images/img2.jpg',
    './assets/images/img3.jpg'
  ];
  currentImage = this.images[0];
  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSwitch();
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
    }, 4000); // Switch image every 3 seconds
  }
}
