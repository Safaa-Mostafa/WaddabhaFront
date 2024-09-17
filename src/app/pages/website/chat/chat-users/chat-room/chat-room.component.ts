import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../auth/Models/user';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit {
  @Input({required: true}) user!: User;
  
  ngOnInit(): void {
console.log(this.user)  
}
}
