import { Injectable } from "@angular/core";
// HTTP Modules
import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";

@Injectable()
export class ApiMethodsService {
  constructor(private http: HttpClient, private constant: ConstantsService) {}

  /**
   * Save into showroom
   * @param userUID_CID
   */
  public saveCarsIntoShowroom(userUID_CID) {
    return this.http.post(
      this.constant.addCar,
      userUID_CID,
      this.constant.httpOptions
    );
  }

  /**
   * Post subscription
   * @param subscription
   */
  public postSubscription(subscription) {
    return this.http.post(
      this.constant.nodeServer,
      subscription,
      this.constant.httpOptions
    );
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
   * Get Makes
   */
  public getMakes() {
    return this.http.get(this.constant.getMakes);
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
   * Suitability search
   */
  public suitabilitySearch() {
    return this.http.get(this.constant.suitabilitySearch);
  }

  /**
   * Search by affordability
   * @param data
   */
  public affordability(data) {
    return this.http.post(
      this.constant.searchByAffordability,
      data,
      this.constant.httpOptions
    );
  }

  /**
   * Subscribe to newsletters
   * @param data
   */
  public newsletter(data) {
    return this.http.post(
      this.constant.newsletter,
      data,
      this.constant.httpOptions
    );
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
   * Get offer details
   * @param itemID
   */
  public offerDetails(itemID) {
    return this.http.get(this.constant.getOfferInformation + itemID);
  }

  /**
   * Book a test drive
   * @param booking
   */
  public bookTestDrive(booking) {
    return this.http.post(this.constant.bookTestDrive, booking, this.constant.httpOptions);
  }

  /**
   * Send booking notification
   * @param dealerID
   */
  public bookingNotification(dealerID) {
    return this.http.get(this.constant.BookingNotification + dealerID);
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
   * Create new password token
   * @param email
   */
  public createPasswordNewToken(email) {
    return this.http.post(
      this.constant.newPassordToken,
      { email: email },
      this.constant.httpOptions
    );
  }

  /**
   * Update password
   * @param newPassword
   * @param passwordToken
   */
  public updatePassword(newPassword, passwordToken) {
    return this.http.post(
      this.constant.updatePassword,
      { password: newPassword, passwordToken: passwordToken },
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

  /**
   * Reject Offer
   * @param itemID
   */
  public rejectOffer(itemID) {
    return this.http.get(this.constant.reject + itemID);
  }

  /**
   * Remove car
   * @param itemID
   * @param uid
   */
  public removeUserShowroomCar(itemID, uid) {
    return this.http.post(
      this.constant.removeUserCar,
      { itemID: itemID, uid: uid },
      this.constant.httpOptions
    );
  }

  /**
   * Get dealer information
   * @param dealerID {number}
   */
  public getDealerName(dealerID: number) {
    return this.http.get(this.constant.dealerName + dealerID);
  }

  /**
   * Get user cars
   * @param userInformation {object}
   */
  public getUserCars(userInformation: any) {
    return this.http.get(this.constant.getShowroomCars + userInformation.uid);
  }

  /**
   * Place offer request
   * @param requestData {object}
   */
  public placeRequest(requestData: any) {
    return this.http.post(this.constant.placeRequest, requestData, this.constant.httpOptions);
  }

  /**
   * Offer interest
   * @param itemID {int}
   */
  public sendInterest(itemID) {
    return this.http.get(this.constant.interested + itemID, this.constant.httpOptions);
  }

  /**
   * Update user profile information
   * @param updateProfileData {object}
   */
  public updateUserInformation(updateProfileData) {
    return this.http.post(this.constant.updateUserDetails, updateProfileData, this.constant.httpOptions);
  }

  public sendRequestNotification(offerData) {
    return this.http.post(this.constant.requestNotification, offerData);
  }


}
