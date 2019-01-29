// Angular modules
import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

// HTTP Modules
import { HttpClient, HttpHeaders } from '@angular/common/http';

// App Components

// Animations Modules
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
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
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, OnDestroy {

  // Sets initial value to true to show loading spinner on first load

  loading = true;

  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
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
    window.scrollTo(0, 0);

    $('#option-a-form').hide();
    $('#option-a').show();

    $('#option-1').on('click', function () {
      $('#option-a').hide();

      setTimeout(function () {
        $('#option-a-form ').show().addClass('animated fadeIn');
      }, 200);

      $('#cancel-a').on('click', function () {
        $('#option-a').show().addClass('animated fadeIn');
        $('#option-a-form ').hide();
      });

    });

    // Search car by make and model
    $('#option-b').show();
    $('#option-b-form ').hide();

    $('#option-2').on('click', function () {
      $('#option-b').hide();

      setTimeout(function () {
        $('#option-b-form').show().addClass('animated fadeIn');
      }, 200);

      $('#cancel-b').on('click', function () {
        $('#option-b').show().addClass('animated fadeIn');
        $('#option-b-form ').hide();
      });
    });

    $(function () { $('#makeModels').hide(); });
  }

  ngOnDestroy() {
    $('#option-a-form').hide();
    $('#option-a').show();
  }

  /**
   *
   */
  public moveDown() {
    $('#more').on('click', function () {
      $('html, body').animate({
        scrollTop: $('.down').offset().top
      }, 1000);
    });
  }

}
