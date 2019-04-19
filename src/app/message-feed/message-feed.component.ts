import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit {

  @Input() feed: any;
  constructor() { }

  ngOnInit() {
  }

}
