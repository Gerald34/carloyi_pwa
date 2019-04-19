import { Injectable } from "@angular/core";
// HTTP Modules
import { ConstantsService } from "./constants.service";
import { SwPush } from '@angular/service-worker';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiMethodsService {
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

  constructor(private push: SwPush,
              private http: HttpClient,
              private constant: ConstantsService
  ) {}

  /**
   * Post subscription
   * @param subscription
   */
  public postSubscription(subscription) {
    return this.http.post(this.constant.nodeServer, subscription, this.constant.httpOptions);
  }

  /**
   * New user registration
   * @param data
   */
  public register(data) {
    return this.http.post(
      this.constant.register,
      data,
      this.constant.httpOptions
    );
  }

  /**
   * Get car information
   * @param id
   */
  public getFullCarInformation(id: string) {
    return this.http.get(this.constant.getCarInformation + id);
  }

  /**
   * Get brand models
   * @param id
   */
  public getBrandModels(id) {
    return this.http.get(this.constant.getBrandModels + id);
  }

  /**
   * Get model by id
   * @param data
   */
  public findModelByID(data) {
    return this.http.get(this.constant.findModelByID + data);
  }

  /**
   * Subscribe to newsletters
   * @param data
   */
  public newsletter(data) {
    return this.http.post(this.constant.newsletter, data, this.constant.httpOptions);
  }

  /**
   * User signin
   * @param email
   * @param password
   */
  public login(email: string, password: string) {
    return this.http.post(
      this.constant.login,
      { email: email, password: password },
      this.constant.httpOptions
    );
  }

  /**
   * Fetch 2 random cars
   */
  public randomCars() {
    const id_1 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_2 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    return this.http.post(
      this.constant.randomCars,
      { car_1: id_1, car_2: id_2 },
      this.constant.httpOptions
    );
  }

  /**
   * Fetch 4 random cars
   */
  public fourRandomCars() {
    const id_1 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_2 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_3 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_4 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    return this.http.post(
      this.constant.randomCarsFour,
      {
        car_1: id_1,
        car_2: id_2,
        car_3: id_3,
        car_4: id_4
      },
      this.constant.httpOptions
    );
  }

  /**
   * Filer by car type
   * @param carType
   * @param maxPrice
   */
  public getFilterByType(carType: any, maxPrice: string) {
    return this.http.post(
      this.constant.getByType,
      { car_type: carType, max_price: maxPrice },
      this.constant.httpOptions
    );
  }

  /**
   * For User Showroom
   * All HTTP Requests
   */

  public sendRequestNotification(offerData) {
    return this.http.post(this.constant.requestNotification, offerData);
  }

  public notifyUser(dealerID) {

    this.push.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => {

      this.saveSubscription(subscription, dealerID).subscribe((response: any) => {
        console.log(response);
      });
    }).catch(err => console.error('Could not subscribe to notifications', err));
  }

  private saveSubscription(subscription, dealerID) {

    // Subscription Payload
    const subscriptionData = {
      subscription: subscription,
      userid: dealerID
    };

    return this.http.post(this.constant.notificationSubscription, subscriptionData);
  }

  public filters(filterData) {
    return this.http.post(this.constant.filterSearch, filterData, this.constant.httpOptions);
  }

}
