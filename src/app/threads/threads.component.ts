import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

  activeChatID: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.ActiveUserChat.subscribe(activeChatID => {
      this.activeChatID = activeChatID;
    })
  }

}
