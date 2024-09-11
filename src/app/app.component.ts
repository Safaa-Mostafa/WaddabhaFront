import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbars/navbar/navbar.component';
import { UsernavbarComponent } from './shared/navbars/usernavbar/usernavbar.component';
import { AuthServiceService } from './pages/website/auth/Services/auth-service.service';
import { Subscription } from 'rxjs';
import { FooterComponent } from './shared/footer/footer.component';
import { NewServiceComponent } from './pages/website/service/new-service/new-service.component';
import { AllServicesComponent } from './pages/website/service/all-services/all-services.component';
import { User } from './pages/website/auth/Models/user';
import Swal from 'sweetalert2';
import { UserService } from './pages/website/users/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    UsernavbarComponent,
    FooterComponent,
    NewServiceComponent,
    AllServicesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Waddabha';
  user:User | null =null;
  constructor(public authService:AuthServiceService,private userService:UserService) {}

  ngOnInit(): void {
this.user =  this.userService.getStoredUserData();
  }

}
