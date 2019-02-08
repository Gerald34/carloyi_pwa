import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { ConstantsService } from './constants.service';
import { ApiMethodsService } from './api-methods.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class WebSocketService {

  private socket;
  readonly VAPID_PUBLIC_KEY = 'BLqOIE4Dh6Iac4pBEVO7Mt0e9eYwwn_sj80NPlk5atVQDE2SCayiWkU_tuJrBA1hB7PuWIvQekQ75PBt0CSJNkA';
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type'
    })
  };

  constructor(
    private push: SwPush,
    private constant: ConstantsService,
    private apiCall: ApiMethodsService,
    private http: HttpClient
    ) { }

  /**
   * Get Notifications
   * @param userID
   */
  public getNotifications(userID) {
    const userIdentity = userID;
    this.push.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => {
      console.log(subscription);
      this.sendSubscription(subscription, userIdentity).subscribe((response: any) => {
        console.log(response);
      });
      }).catch(err => console.error('Could not subscribe to notifications', err));
  }

  /**
   * Send Subscription
   * @param subscription
   * @param userIdentity
   */
  private sendSubscription(subscription, userIdentity) {

    // Subscription Payload
    const subscriptionData = {
      subscription: subscription,
      userid: userIdentity
    };

    return this.http.post(this.constant.notificationSubscription, subscriptionData, this.httpOptions);
  }

}
