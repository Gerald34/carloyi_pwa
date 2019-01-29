import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

// HTTP Modules
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {NavigationEnd, Router} from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import * as $ from 'jquery';

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
      private spinnerService: Ng4LoadingSpinnerService,
      @Inject(LOCAL_STORAGE) private storage: WebStorageService,
      private router: Router,
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
