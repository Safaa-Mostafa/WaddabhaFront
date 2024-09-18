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
    this.userServcie.profile().subscribe({
      next:(res)=>{
this.user =res.data;
      },error:(err)=>{

      }
    })
  }

}
