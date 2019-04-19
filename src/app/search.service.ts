import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';


@Injectable()
export class SearchService {

  returnData: any;
  public resultsSubject = new Subject<any>();
  public userLoginSubject = new Subject<any>();
  constructor(private http: Http) { }

  public storeSearchData(data) {
    this.getSearchResults(data);
  }

  public getSearchResults(data) {
    this.resultsSubject.next(data);
  }

  public watchLogin(data) {
    this.distLogin(data);
  }

  public distLogin(data) {
    this.userLoginSubject.next(data);
  }

}
