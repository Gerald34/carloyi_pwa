import {Component, Inject, OnInit} from '@angular/core';

// HTTP Modules
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  readonly apiHost = 'https://api.carloyi.com/index.php';
    // Set HTTP Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    constructor(
      private http: HttpClient,
      @Inject(LOCAL_STORAGE) private storage: WebStorageService,
      private router: Router,
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
