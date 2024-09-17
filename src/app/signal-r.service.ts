import { Injectable ,Inject, PLATFORM_ID } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthServiceService } from './pages/website/auth/Services/auth-service.service';
import { Message } from './shared/chat-box/models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;
  private messageSource = new BehaviorSubject<Message>({} as Message);
  currentMessage = this.messageSource.asObservable();
  public token: string | null;

  private receiverSource = new BehaviorSubject<string | null>(null);
  currentReceiver = this.receiverSource.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService:AuthServiceService, private http: HttpClient){//, private AauthService: ) {
    this.token =authService.getToken();//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBeWF0IiwianRpIjoiOTY3MjBjYTgtNTlmOS00N2NhLTk3OTktYmZhMjZhNmFjMzE4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJmM2MwMjI1OS0wMWIxLTQ1N2EtYjJiYy01NzExZDA4YTM3MWIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJCdXllciIsImV4cCI6MTcyNzAyNzE5NiwiaXNzIjoiV2FkZGFiaGEiLCJhdWQiOiJVc2VycyJ9.GjBJl9Q4RfJvQXgyDVxTPeZuGeQrJ1yrHRfSJRlsqu4';//this.isBrowser() ? localStorage.getItem("token") : null;
    console.log('Token:', this.token); // Debugging line to check the token value
  }
  

  public setActiveReceiver(receiverId: string): void {
    this.receiverSource.next(receiverId);
  }

  public startConnection(chatRoomId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7116/chatHub', {
     accessTokenFactory: () => this.authService.getToken() || ''// Ensure it always returns a string
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
      console.log('SignalR connection started');
      // Optionally, add listeners here if needed
      this.joinChatRoom(chatRoomId);
      this.addReceiveMessageListener();
    })

  }
  public joinChatRoom(chatRoomId: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('JoinChatRoom', chatRoomId).catch(err => console.error(err));
    }
  }

  // Leave a specific chat room (group)
  public leaveChatRoom(chatRoomId: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('LeaveChatRoom', chatRoomId).catch(err => console.error(err));
    }
  }
  public addReceiveMessageListener(): void {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveMessage', (senderId: string, content: string, timestamp: Date) => {
        const message :Message={senderId,body:content,createdAt:timestamp}
        
        this.messageSource.next(message);
      });
    }
  }
  public sendMessage(senderId: string, /*receiverId: string,*/ content: string,ChatRoomId:string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('SendMessageToChatRoom', senderId, /*receiverId,*/ content,ChatRoomId)
        .catch(err => console.error(err));
    }
  }
  private baseUrl = "https://localhost:7116/api/chatrooms"
  public loadChat(chatRoomId: string) : Observable<any> {
    return this.http.get(this.baseUrl + `/${chatRoomId}`);
  }
  public loadChatRooms() : Observable<any> {
    return this.http.get(this.baseUrl);
  }
  }

