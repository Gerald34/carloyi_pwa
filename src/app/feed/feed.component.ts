import {Component, OnInit, OnChanges, Input} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { AngularFireList } from 'angularfire2/database';
import { ChatMessage } from '../models/chat-message.model';
import * as $ from "jquery";
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: AngularFireList<ChatMessage>;
  feedChange: Observable<any>;
  @Input() chatObject: any;
  activeChatID: string;

  time = new Date();

  constructor(private chat: ChatService) { }

  ngOnInit() {

    this.chat.ActiveFeed.subscribe((data: string) => {
      this.activeChatID = data;

      this.feedChange = this.chat.getMessages(this.activeChatID).valueChanges();
      this.feedChange.subscribe(feed => {
        this.feed = feed;
      });

      this.feedChange = this.chat.getSavedFiles(this.activeChatID).valueChanges();
      this.feedChange.subscribe(feed => {
        this.feed = feed;
      });

    });

  }

  ngOnChanges() {

    this.feedChange = this.chat.getMessages(this.activeChatID).valueChanges();
    this.feedChange.subscribe(feed => {
      this.feed = feed;
    });

    this.feedChange = this.chat.getSavedFiles(this.activeChatID).valueChanges();
    this.feedChange.subscribe(feed => {
      this.feed = feed;
    });

  }

}
