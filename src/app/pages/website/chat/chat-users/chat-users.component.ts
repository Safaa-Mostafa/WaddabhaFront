import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessary Angular modules
import { SignalrService } from '../../../../shared/services/signal-r/signal-r.service';
import { ChatRoom } from '../../../../shared/chat-box/models/chat-room';
import { UserService } from '../../users/services/user.service';
import { User } from '../../auth/Models/user';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { LoadingService } from '../../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ChatRoomComponent], // Import necessary Angular modules here
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css'],
})
export class UserListComponent implements OnInit {
  chatRooms!: ChatRoom[];
  @Input({ required: true }) user!: User;
  @Input() chatRoomId!: string;
  @Output() selectRoom = new EventEmitter<string>();

  constructor(
    private signalrService: SignalrService,
    public userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.loadingService.startLoading();
    // Add logic here to update user statuses if needed
    this.loadChatRooms();
  }

  selectChatRoom(chatRoomId: string) {
    this.selectRoom.emit(chatRoomId);
  }

  loadChatRooms(): void {
    this.signalrService.loadChatRooms().subscribe({
      next: (res) => {
        this.chatRooms = res.data;
        // this.loadingService.stopLoading();
      },
    });
  }
}
