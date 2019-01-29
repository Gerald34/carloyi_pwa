import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  filterResults = JSON.parse(this.storage.get('filterResults'));

  

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  ngOnInit() {

  }

}
