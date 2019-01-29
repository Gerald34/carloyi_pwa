import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  coursesObservable: Observable<any[]>;
  constructor(private chat: ChatService, private db: AngularFireDatabase) { }

  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  ngOnInit() {
   // this.chat.messages.subscribe(msg => {
   //    console.log(msg);
   //  });
   //  this.coursesObservable = this.getCourses('/courses');
  }

  sendMessage(message: any) {
   // this.chat.sendMsg(message);
  }

}
