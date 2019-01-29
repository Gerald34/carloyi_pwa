import {Component, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { ChatService } from './services/chat.service';
import { SearchService } from './services/search.service';
import { ApiMethodsService } from './services/api-methods.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  carInformation: any;

  constructor(
    private http: Http,
    private chat: ChatService,
    public searchService: SearchService,
    private apiMethods: ApiMethodsService,
  ) {

  }

  ngOnInit() {
    // this.chat.createChat();
    // this.chat.sendMessage('blah blah');
    this.searchService.fullCarSubject.subscribe((data: any) => {
      this.carInformation = data.carInformation[0];
    });
  }
}
