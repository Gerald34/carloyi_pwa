import {Component, Inject, OnInit} from '@angular/core';
import { Newsletter } from './newsletter';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import swal from 'sweetalert2';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  userList: Newsletter[] = [];
  readonly apiDomain = 'http://localhost:8000';
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  /**
   * @param {HttpClient} http
   * @param {Ng4LoadingSpinnerService} spinnerService
   * @param {Router} router
   * @param {WebStorageService} storage
   */
  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {

  }

}
