import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { UriService } from '../uri/uri.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  readonly VAPID_PUBLIC_KEY = 'BLqOIE4Dh6Iac4pBEVO7Mt0e9eYwwn_sj80NPlk5atVQDE2SCayiWkU_tuJrBA1hB7PuWIvQekQ75PBt0CSJNkA';
  readonly notificationSubscription = this.uri.api + '/api/push_notifications/subscribe';
  readonly requestNotification = this.uri.api + '/api/push_notifications/request_push_message';
  
  constructor(private push: SwPush, private http: HttpClient, private uri: UriService) { }

  public notifyUser(dealerID) {

    this.push.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => {
      this.saveSubscription(subscription, dealerID).subscribe((response: any) => {
      });
    }).catch(err => {
      return { error: err, message: 'Could not subscribe to notifications' }
    });
  }

  private saveSubscription(subscription, dealerID) {

    // Subscription Payload
    const subscriptionData = {
      subscription: subscription,
      userid: dealerID
    };

    return this.http.post(this.notificationSubscription, subscriptionData);
  }
}
