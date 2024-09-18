import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../pages/website/auth/Services/auth-service.service';
import { UserService } from '../../../pages/website/users/services/user.service';
import { User } from '../../../pages/website/auth/Models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css'],
})
export class UsernavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to user data changes
    this.userSubscription = this.authService.userData$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.userSubscription.unsubscribe();
  }

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isalertOpen = false;
    this.ismsgOpen = false;
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
    this.router.navigateByUrl('/login');
  }

  isalertOpen: boolean = false;

  alertMenu() {
    this.isMenuOpen = false;
    this.ismsgOpen = false;
    this.isalertOpen = !this.isalertOpen;
  }

  ismsgOpen: boolean = false;

  msgMenu() {
    this.isalertOpen = false;
    this.isMenuOpen = false;
    this.ismsgOpen = !this.ismsgOpen;
  }
}
