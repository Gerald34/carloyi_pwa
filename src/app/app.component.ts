import {Component, OnInit} from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  carInformation: any;

  constructor(
    public searchService: SearchService,
  ) {

  }

  ngOnInit() {
    this.searchService.fullCarSubject.subscribe((data: any) => {
      this.carInformation = data.carInformation[0];
    });
  }
}
