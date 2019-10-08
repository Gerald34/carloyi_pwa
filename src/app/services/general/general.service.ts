import { Injectable } from '@angular/core';
import { UriService } from '../uri/uri.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  // General purpose routes
  readonly signin = this.uri.api + "/api/signin";
  readonly deals = this.uri.api + "/api/portal/deals/";
  readonly placeOffer = this.uri.api + "/api/portal/placeoffer";
  readonly getEntries = this.uri.api + "/api/portal/";
  readonly getDealerCars = this.uri.api + "/api/portal/floorCars/";
  readonly registration = this.uri.api + "/api/register";
  readonly newsletterSubscription = this.uri.api + "/api/newsletter";
  readonly getRandomCars = this.uri.api + "/api/carsearch/randomcars";
  readonly randomCarsFour = this.uri.api + "/api/carsearch/randomcarsfour";
  readonly specials = this.uri.api + '/api/specials';

  constructor(private uri: UriService, private http: HttpClient) { }

  /**
   * User signin
   * string : email
   * string : password
   */
  public login(email: string, password: string) {
    return this.http.post(this.signin, { email: email, password: password }, this.uri.httpOptions);
  }

  /**
   * New user registration
   */
  public register(data) {
    return this.http.post(this.registration, data, this.uri.httpOptions);
  }

  /**
   * Fetch 4 random cars
   */
  public fourRandomCars() {
    const id_1 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_2 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_3 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_4 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    return this.http.post(this.randomCarsFour, {
        car_1: id_1,
        car_2: id_2,
        car_3: id_3,
        car_4: id_4
      }, this.uri.httpOptions
    );
  }

  public randomCars() {
    const id_1 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_2 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    return this.http.post(this.getRandomCars, { car_1: id_1, car_2: id_2 }, this.uri.httpOptions);
  }

  /**
   * Subscribe to newsletters
   */
  public newsletter(data) {
    return this.http.post(this.newsletterSubscription, data, this.uri.httpOptions);
  }

  public getSpecials() {
    return this.http.get(this.specials);
  }
  
}
