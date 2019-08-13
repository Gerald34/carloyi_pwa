import { Injectable } from '@angular/core';
import { UriService } from '../uri/uri.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowroomService {
  readonly updateUserDetails = this.uri.api + '/api/showroom/updateprofile';
  readonly dealerName = this.uri.api + "/api/dealerName/";
  readonly getShowroomCars = this.uri.api + "/api/showroom/cars/";
  readonly placeCarRequest = this.uri.api + "/api/showroom/placerequest";
  readonly removeUserCar = this.uri.api + "/api/showroom/removeCar";
  readonly newPasswordToken = this.uri.api + "/api/newPasswordToken";
  readonly updateUserPassword = this.uri.api + "/api/updatePassword";
  readonly reject = this.uri.api + "/api/showroom/reject/";
  readonly getOfferInformation = this.uri.api + "/api/showroom/offerInformation/";
  readonly bookDealerTestDrive = this.uri.api + "/api/showroom/booking";
  readonly BookingNotification = this.uri.nodeServer + "/booking?dealerID=";
  readonly addCar = this.uri.api + "/api/showroom/add";
  readonly interested = this.uri.api + "/api/showroom/interested/";
  readonly getOffers = this.uri.api + "/api/showroom/offers/";

  constructor( private uri: UriService, private http: HttpClient) { }

  /**
   * Get User offers from dealers
   * @param userID
   */
  public getUserOffers(userID: number) {
    return this.http.get(this.getOffers + userID);
  }


  /**
   * Place offer request
   * @param requestData {object}
   */
  public placeRequest(requestData: any) {
    return this.http.post(this.placeCarRequest, requestData, this.uri.httpOptions);
  }

    /**
   * Save into showroom
   * @param userUID_CID
   */
  public saveCarsIntoShowroom(userUID_CID) {
    return this.http.post(this.addCar, userUID_CID, this.uri.httpOptions);
  }

    /**
   * Get offer details
   * @param itemID
   */
  public offerDetails(itemID) {
    return this.http.get(this.getOfferInformation + itemID);
  }

    /**
   * Book a test drive
   * @param booking
   */
  public bookTestDrive(booking) {
    return this.http.post(this.bookDealerTestDrive, booking, this.uri.httpOptions);
  }

    /**
   * Update user profile information
   * @param updateProfileData {object}
   */
  public updateUserInformation(updateProfileData) {
    return this.http.post(this.updateUserDetails, updateProfileData, this.uri.httpOptions);
  }

    /**
   * Send booking notification
   * @param dealerID
   */
  public bookingNotification(dealerID) {
    return this.http.get(this.BookingNotification + dealerID);
  }

    /**
   * Create new password token
   * @param email
   */
  public createPasswordNewToken(email) {
    return this.http.post(this.newPasswordToken, { email: email }, this.uri.httpOptions);
  }

    /**
   * Update password
   * @param newPassword
   * @param passwordToken
   */
  public updatePassword(newPassword, passwordToken) {
    return this.http.post(this.updateUserPassword,
      { password: newPassword, passwordToken: passwordToken }, this.uri.httpOptions);
  }

   /**
   * Reject Offer
   * @param itemID
   */
  public rejectOffer(itemID) {
    return this.http.get(this.reject + itemID);
  }

   /**
   * Remove car
   * @param itemID
   * @param uid
   */
  public removeUserShowroomCar(itemID, uid) {
    return this.http.post(this.removeUserCar, { itemID: itemID, uid: uid }, this.uri.httpOptions);
  }

    /**
   * Offer interest
   * @param itemID {int}
   */
  public sendInterest(itemID) {
    return this.http.get(this.interested + itemID, this.uri.httpOptions);
  }

    /**
   * Get user cars
   * @param userInformation {object}
   */
  public getUserCars(userInformation: any) {
    return this.http.get(this.getShowroomCars + userInformation.uid);
  }

    /**
   * Get dealer information
   * @param dealerID {number}
   */
  public getDealerName(dealerID: number) {
    return this.http.get(this.dealerName + dealerID);
  }

}
