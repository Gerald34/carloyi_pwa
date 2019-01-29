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
  userDataInfo: any = JSON.parse(this.storage.get('userDataInfo'));
  // searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));
  loggedin = false;
  isResults: string;
  searchedCarResults: any;
  searchResults = false;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public results: SearchService,
    public login: LoginService
  ) { }

  ngOnInit() {

    $('#signUp a').on('click', function() {
      $('.navbar-collapse').collapse('hide');
    });

    // $(document).on('click', '.navbar-collapse.in', function(e) {
    //   if ( $(e.target).is('a') ) {
    //     $(this).collapse('hide');
    //   }
    // });

    $('.navbar-nav > li > a').on('click', function() {
      $('.navbar-collapse').collapse('hide');
    });

    this.results.resultsSubject
      .subscribe((data: any) => {
        this.searchResults = true;
      });

    this.login.userLoginSubject
      .subscribe((data: any) => {
        if (data.status === 'active') {
          this.loggedin = true;
        } else if (data.status === 'inactive') {
          this.loggedin = false;
        }
      });

    if (this.userDataInfo === null) {
      this.loggedin = false;
    } else {
      this.loggedin = true;
    }

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

  // End of Header Component
}
