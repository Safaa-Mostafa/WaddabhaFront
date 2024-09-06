import { Component } from '@angular/core';
import { AuthServiceService } from '../auth/Services/auth-service.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { CategoriesComponent } from "./categories/categories.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AboutUsComponent, HeroSectionComponent, CategoriesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
constructor(private service :AuthServiceService){



}

}
