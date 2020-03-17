import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import { Lightbox } from 'ngx-lightbox';
import { MatDialog } from '@angular/material';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  messageContent: string;
  timeSent: string;
  user: Observable<firebase.User>;
  isOwnMessage = false;
  file: any;
  name: string;
  fileInput = false;
  incomeMessage: any;

  constructor(
    private authService: AuthService,
    private _lightbox: Lightbox,
    public dialog: MatDialog,
    public dataShare: LoginService,
    public dialogComponent: ImageDialogComponent
  ) { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.incomeMessage = this.chatMessage;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
    this.messageContent = chatMessage.message;
    this.timeSent = chatMessage.timeSent;


    if (chatMessage.file === 'none') {
      this.fileInput = false;
    } else {
      this.fileInput = true;
      this.file = chatMessage.file;
      this.name = chatMessage.name;
      this.messageContent = '';
    }

    this.user = this.authService.authUser();
    this.user.subscribe(user => {
      if (user.email === this.userEmail) {
        this.isOwnMessage = true;
      }
    });

  }

  openDialog(event) {

    const image_url = event.target.src;
    this.dataShare.viewImageDialog(
      {
        url: image_url,
        userName: this.userName
      });
    const dialogRef = this.dialog.open(ImageDialogComponent,  {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  open(event): void {
    // open lightbox
    this._lightbox.open(event.target.src);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
