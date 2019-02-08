import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { SearchService } from '../services/search.service';
import { LoginService } from '../services/login.service';
// import {setTimeout} from 'timers';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any = this.storage.get('userInformation');
  userDataInfo: any;
  loggedin = false;
  searchedCarResults: any;
  searchResults = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public results: SearchService,
    public login: LoginService,
  ) { }

  ngOnInit() {

    if (this.data !== null) {
      if (typeof this.data.userData !== 'undefined' || typeof this.data.userData !== null) {
        this.userDataInfo = this.data.userData;
        this.results.resultsSubject
          .subscribe((data: any) => {
            this.searchResults = true;
          });

        if (this.userDataInfo === null) {
          this.loggedin = false;
        } else {
          this.loggedin = true;
        }
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }

    this.login.userLoginSubject
      .subscribe((data: any) => {
        if (data.status === 'active') {
          this.loggedin = true;
        } else if (data.status === 'inactive') {
          this.loggedin = false;
        }
      });

    const lastItems = $('.navbar-nav li .nav-item a');
    lastItems.slice(lastItems.length - 2).addClass('boldText');

    $(function () {
      let scroll_pos = 0;
      $(document).scroll(function () {
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 50) {
          $('.bg-light').css('background-color', '#4aa0d5');
        } else {
          $('.bg-light').css('background-color', 'transparent');
        }
      });
    });

  }

  navbarCollapse() {
    $('.navbar-collapse').collapse('hide');
  }

  // End of Header Component
}
