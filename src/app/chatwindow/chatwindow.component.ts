import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {

  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor(private chat: ChatService) { }

  @Input() chatInformation: any;
  chatActive = false;
  dealerInformation: any;
  activeChatID: string;

  ngOnInit() {

    this.chat.ActiveUserChat.subscribe(activeChatID => {
      this.activeChatID = activeChatID;
    })

    this.chat.chatActiveSubject.subscribe((data: any) => {
      console.log(data);
      this.dealerInformation = data;
      this.chatActive = true;
    });
  }

  public minimize() {
    $('#windowBody').toggle();
    $('#chatForm').toggle();
  }

  // ngAfterViewChecked() {
  //   this.scrollTobottom();
  // }

  // scrollTobottom(): void {
  //   this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  // }

}
