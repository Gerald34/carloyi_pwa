import {Inject, Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class SearchService {

  returnData: any;
  public resultsSubject = new Subject<any>();
  public fullCarSubject = new Subject<any>();
  public clickEvent = new Subject<any>();
  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService ) { }

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


}
