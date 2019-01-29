import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.css']
})
export class TopBannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   *
   */
  public moveDown() {
    $('html, body').animate({
      scrollTop: $('.searchOptions').offset().top
    }, 1000);
  }
}
