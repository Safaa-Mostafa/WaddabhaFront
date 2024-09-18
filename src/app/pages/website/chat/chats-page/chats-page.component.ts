import { Component, OnInit } from '@angular/core';
import { MessagesComponent } from '../../../../shared/chat-box/chat-box.component';
import { UserListComponent } from '../chat-users/chat-users.component';
import { User } from '../../auth/Models/user';
import { UserService } from '../../users/services/user.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [MessagesComponent, UserListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.css',
})
export class ChatsPageComponent implements OnInit {
  user!: User;
  chatRoomId: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const roomId = navigation?.extras?.state?.chatRoomId;
    this.selectChatRoom(roomId);
  }

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.loadUser();
  }

  selectChatRoom(chatRoomId: string): void {
    this.chatRoomId = chatRoomId;
  }

  loadUser(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res.data;
        this.loadingService.stopLoading();
      },
    });
  }
}
