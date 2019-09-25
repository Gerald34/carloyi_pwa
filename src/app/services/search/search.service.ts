import { Injectable, Inject } from '@angular/core';
import { UriService } from '../uri/uri.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  readonly brands = this.uri.api + "/api/brands";
  readonly searchByAffordability = this.uri.api + "/api/affordability";
  readonly suitabilitySearchRequest = this.uri.api + "/api/allCars";
  readonly searchByID = this.uri.api + "/api/carsearch/specific/";

  returnData: any;
  public resultsSubject = new Subject<any>();
  public fullCarSubject = new Subject<any>();
  public clickEvent = new Subject<any>();
  constructor(
    private http: HttpClient, private uri: UriService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
    ) { }

  // Get all makes
  public getBrands() {
    return this.http.get(this.brands, this.uri.httpOptions);
  }

  // Search by affordability
  public affordability(data) {
    return this.http.post(this.searchByAffordability, data, this.uri.httpOptions);
  }

  // Suitability search
  public suitabilitySearch() {
    return this.http.get(this.suitabilitySearchRequest);
  }

  /**
   * Get model by id
   * @param data
   */
  public findModelByID(data) {
    return this.http.get(this.searchByID + data);
  }

  public storeSearchData(data) {
    this.getSearchResults(data);
  }

  public getSearchResults(data) {
    this.resultsSubject.next(data);
  }

  public storeFullCarData(data) {
    this.getFullCarResults(data);
  }

  public getFullCarResults(data) {
    this.fullCarSubject.next(data);
  }

  public setStorageItem(storageSession: string, arrayData: any) {
    this.storage.set(storageSession, JSON.stringify(arrayData));
  }


  public searchClick(data: any) {
    this.clickEvent.next(data);
  }

}
