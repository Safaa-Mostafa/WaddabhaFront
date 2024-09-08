import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../pages/website/auth/Services/auth-service.service';
import { UserService } from '../../../pages/website/users/services/user.service';
import { User } from '../../../pages/website/auth/Models/user';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.css',
})
export class UsernavbarComponent implements OnInit {
  user: User | null = null;
  constructor(
    private service: AuthServiceService,
    private router: Router,
    private userServcie: UserService
  ) {}
  ngOnInit() {
    this.user = this.userServcie.getStoredUserData();
    console.log(this.user);
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
    this.service.logout();
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
  msgMenue() {
    this.isalertOpen = false;
    this.isMenuOpen = false;
    this.ismsgOpen = !this.ismsgOpen;
  }
}
