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
import { UserService } from './pages/website/users/services/user.service';
import { SignalrService } from './signal-r.service'
import { MessagesComponent } from './shared/chat-box/chat-box.component';

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
   MessagesComponent

   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Waddabha';
  user: User | null = null;
  isLoading = true;
  isAuthenticated: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(public authService: AuthServiceService, private userService: UserService,private SignalrService:SignalrService)  {}

  ngOnInit(): void {
    this.user = this.userService.getStoredUserData();
    this.authSubscription.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Clean up subscriptions
  }
}
