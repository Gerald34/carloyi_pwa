import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { ApiMethodsService } from '../services/api-methods.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-suitability-search',
  templateUrl: './suitability-search.component.html',
  styleUrls: ['./suitability-search.component.css']
})
export class SuitabilitySearchComponent implements OnInit {

  constructor(
    private router: Router,
    private searchService: SearchService,
    private ApiMethods: ApiMethodsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
  }

  /**
   * Get all cars
   * @url /api/allCars
   * @param {string} type
   * @returns {Subscription}
   */
  public suitabilitySearch() {
    return this.ApiMethods.suitabilitySearch().subscribe((data: any) => {
      this.searchService.setStorageItem('searchedCarResults',
        {
          results: data,
          type: 'suitabilitySearch'
        });
      this.storage.set('car_type', {
        data: data,
        type: 'suitabilitySearch',
        title: 'Search cars'
      });
      this.searchService.storeSearchData(data);
      this.router.navigate(['results']);
    });
  }

}
