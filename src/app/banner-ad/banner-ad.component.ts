import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-ad',
  templateUrl: './banner-ad.component.html',
  styleUrls: ['./banner-ad.component.css']
})
export class BannerAdComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
