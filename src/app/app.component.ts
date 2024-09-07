import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbars/navbar/navbar.component';
import { UsernavbarComponent } from "./shared/navbars/usernavbar/usernavbar.component";
import { AuthServiceService } from './pages/website/auth/Services/auth-service.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from "./shared/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, UsernavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'Waddabha';
  constructor(public authService: AuthServiceService) {

  }


}
