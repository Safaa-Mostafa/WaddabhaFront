import { Component, OnInit } from '@angular/core';
import { Init } from 'v8';
import { User } from '../../auth/Models/user';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;


  constructor( private router: Router, private userServcie: UserService){}

  ngOnInit() {

    this.user = this.userServcie.getStoredUserData();
    console.log(this.user);
  }
  goToEdit() {
    if (this.user && this.user) {
      this.router.navigate(['/user-edit', this.user.id]);
    } else {
      console.error('User ID not found!');
    }
  }
  
}
