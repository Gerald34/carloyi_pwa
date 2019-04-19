import {Component, OnInit, Input, Inject} from '@angular/core';
import { ChatService } from '../services/chat.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: "app-active-users",
  templateUrl: "./active-users.component.html",
  styleUrls: ["./active-users.component.css"]
})
export class ActiveUsersComponent implements OnInit {
  @Input() activeUsers: any;
  users: any;
  userInformation = this.storage.get('userInformation');

  constructor(
    private chatService: ChatService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) {}

  ngOnInit() {
    this.activeUsers.subscribe(users => {
      this.users = users;
    });
  }

  openThread(event) {
    const targetID = event.target.id;
    this.chatService.storeActivefeed(targetID);
    $('div.user').removeClass('activeChat');
    $('#' + targetID).addClass('activeChat');
  }

}
