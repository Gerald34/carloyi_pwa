import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  public userLoginSubject = new Subject<any>();
  public itemIdSubject = new Subject<number>();
  public imageUrlSubject = new Subject<any>();

  constructor() { }

  /**
   *
   * @param data
   */
  public watchLogin(data) {
    this.distLogin(data);
  }

  /**
   *
   * @param data
   */
  public distLogin(data) {
    this.userLoginSubject.next(data);
  }

  public getItemID(itemID) {
    this.pushItemID(itemID);
  }

  public pushItemID(itemID) {
    this.itemIdSubject.next(itemID);
  }

  public viewImageDialog(data) {
    this.imageUrlSubject.next(data);
  }

}
