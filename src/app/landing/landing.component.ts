// Angular modules
import { Component, OnInit, OnDestroy } from '@angular/core';

// HTTP Modules
import { HttpClient } from '@angular/common/http';

// App Components

// Animations Modules
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { SuitabilitySearchComponent } from '../suitability-search/suitability-search.component';
import {SearchService} from '../services/search/search.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit, OnDestroy {

  // Sets initial value to true to show loading spinner on first load

  loading = true;
  randomCars: any;
  imagepath = "https://images.carloyi.com/";

  constructor(
    private http: HttpClient,
    private router: Router,
    public results: SearchService,
    public suitable: SuitabilitySearchComponent

  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }

    if (event instanceof NavigationError) {
      this.loading = false;
    }

  }

  // On application initialization
  ngOnInit() {
    this.results.clickEvent.subscribe((data: any) => {
      if (data.clicked === true) {
        console.log(data);
        $('html, body').animate({
          scrollTop: $(".searchOptions").offset().top
        }, 2000);
      } else {
        window.scrollTo(0, 0);
      }
    });
    $(function () { $('#makeModels').hide(); });
  }

  ngOnDestroy() {
    $('#option-a-form').hide();
    $('#option-a').show();
  }

}
