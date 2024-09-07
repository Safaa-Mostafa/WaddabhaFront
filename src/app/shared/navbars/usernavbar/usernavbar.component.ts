import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../pages/website/auth/Services/auth-service.service';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.css',
})
export class UsernavbarComponent {
  constructor(private service: AuthServiceService, private router: Router) {}
  isMenuOpen: boolean = false;
  toggleMenu() {
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
}
