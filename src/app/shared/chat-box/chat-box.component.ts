import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignalrService } from '../services/signal-r/signal-r.service';
import { CommonModule } from '@angular/common';
import { Message } from './models/message';
import { User } from '../../pages/website/auth/Models/user';
import { UserService } from '../../pages/website/users/services/user.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule for standalone component
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class MessagesComponent implements OnInit, OnChanges {
  messages: Message[] = [];
  profile!: User;
  messageForm: FormGroup;
  buyer!: User;
  seller!: User;
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  receiverId!: string | null; // Will be set when a user is selected from the user list
  @Input({ required: true }) ChatRoomId!: string;

  constructor(
    private fb: FormBuilder,
    private signalrService: SignalrService,
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    // Initialize the form in the constructor or in ngOnInit
    this.messageForm = this.fb.group({
      newMessage: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ChatRoomId'] && !changes['ChatRoomId'].isFirstChange()) {
      // chatRoomId has changed, load the chat room again
      this.signalrService.startConnection(this.ChatRoomId);
      this.loadChat(this.ChatRoomId);
    }
  }

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.loadProfile();
    this.signalrService.startConnection(this.ChatRoomId);
    this.loadChat(this.ChatRoomId);
    // this.signalrService.addReceiveMessageListener();
    // this.receiverId = '7cfa8c83-300e-4293-98c9-c74ca11c0c49';
    // Listen for selected user from user-list component
    // this.signalrService.currentReceiver.subscribe(receiverId => {
    //   this.receiverId = receiverId;
    //   this.loadChat(receiverId!);
    // });

    // Listen for new messages
    this.signalrService.currentMessage.subscribe((message: Message) => {
      if (message) {
        this.messages.push(message);
      }
    });
  }

  sendMessage(): void {
    const newMessage = this.messageForm.get('newMessage')?.value;
    //console.log(newMessage);
    // this.receiverId = '7cfa8c83-300e-4293-98c9-c74ca11c0c49';
    if (newMessage) {
      //&& this.receiverId) {
      this.signalrService.sendMessage(
        this.profile.id,
        /*this.receiverId,*/ newMessage,
        this.ChatRoomId
      );
      this.messageForm.reset();
    }
  }
  // Method to track messages by their unique ID
  trackById(index: number, message: any): number {
    return message.id;
  }
  loadChat(chatRoomId: string): void {
    // Load chat history for selected user (receiverId) - implement logic as needed
    console.log('Loading chat with:', chatRoomId);
    this.messages = []; // Clear previous chat and load new messages
    this.signalrService.loadChat(chatRoomId).subscribe({
      next: (res) => {
        this.messages = res.data.messages;
        this.loadingService.stopLoading();
      },
    });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer?.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy(): void {
    // Leave the chat room when the component is destroyed
    this.signalrService.leaveChatRoom(this.ChatRoomId);
  }
  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profile = res.data;
        console.log(res.data);
      },
    });
  }
}
