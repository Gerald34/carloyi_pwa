import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  ActiveUsers: any;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // this.ActiveUsers = this.chatService.getAllUsers();
    this.ActiveUsers = this.chatService.getActiveDeals().valueChanges();
  }

}
