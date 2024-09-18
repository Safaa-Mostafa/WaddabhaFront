import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbars/navbar/navbar.component';
import { UsernavbarComponent } from './shared/navbars/usernavbar/usernavbar.component';
import { AuthServiceService } from './pages/website/auth/Services/auth-service.service';
import { Observable, Subscription } from 'rxjs';
import { FooterComponent } from './shared/footer/footer.component';
import { NewServiceComponent } from './pages/website/service/new-service/new-service.component';
import { AllServicesComponent } from './pages/website/service/all-services/all-services.component';
import { User } from './pages/website/auth/Models/user';
import { UserService } from './pages/website/users/services/user.service';
import { MessagesComponent } from './shared/chat-box/chat-box.component';
import { LoadingService } from './shared/services/loading/loading.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

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
    MessagesComponent,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed typo 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Waddabha';
  user: User | null = null;
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  private authSubscription: Subscription = new Subscription();
  private loadingSubscription: Subscription = new Subscription();
  constructor(
    public authService: AuthServiceService,
    private userService: UserService,
    public loadingService: LoadingService
  ) {
    //this.isLoading = this.loadingService.getLoading();
  }

  ngOnInit(): void {
    this.user = this.userService.getStoredUserData();
    this.authSubscription.add(
      this.authService.isAuthenticated$.subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
      })
    );
    this.loadingSubscription.add(
      this.loadingService.isLoading$.subscribe((isLoad) => {
        this.isLoading = isLoad;
      })
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe(); // Clean up subscriptions
  }
}
