import { Component } from '@angular/core';
import { AboutUsComponent } from "../about-us/about-us.component";
import { AuthServiceService } from '../auth/Services/auth-service.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [AboutUsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
constructor(private service :AuthServiceService){



}

}
