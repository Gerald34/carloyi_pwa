import { Injectable } from "@angular/core";
// HTTP Modules
import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";

@Injectable()
export class ApiMethodsService {
  constructor(private http: HttpClient, private constant: ConstantsService) {}

  public saveCarsIntoShowroom(userUID_CID) {
    return this.http.post(
      this.constant.addCar,
      userUID_CID,
      this.constant.httpOptions
    );
  }

  public postSubscription(subscription) {
    return this.http.post(
      this.constant.nodeServer,
      subscription,
      this.constant.httpOptions
    );
  }

  public register(data) {
    return this.http.post(
      this.constant.register,
      data,
      this.constant.httpOptions
    );
  }

  public sendInterest(itemID) {
    return this.http.get(
      this.constant.interested + itemID,
      this.constant.httpOptions
    );
  }

  public getFullCarInformation(id: string) {
    return this.http.get(this.constant.getCarInformation + id);
  }

  public getMakes() {
    return this.http.get(this.constant.getMakes);
  }

  public getBrandModels(id) {
    return this.http.get(this.constant.getBrandModels + id);
  }

  public findModelByID(data) {
    return this.http.get(this.constant.findModelByID + data);
  }

  public suitabilitySearch() {
    return this.http.get(this.constant.suitabilitySearch);
  }

  public affordability(data) {
    return this.http.post(
      this.constant.searchByAffordability,
      data,
      this.constant.httpOptions
    );
  }

  public newsletter(data) {
    return this.http.post(
      this.constant.newsletter,
      data,
      this.constant.httpOptions
    );
  }

  public login(email: string, password: string) {
    return this.http.post(
      this.constant.login,
      { email: email, password: password },
      this.constant.httpOptions
    );
  }

  public offerDetails(itemID) {
    return this.http.get(this.constant.getOfferInformation + itemID);
  }

  public bookTestDrive(booking) {
    return this.http.post(
      this.constant.bookTestDrive,
      booking,
      this.constant.httpOptions
    );
  }

  public bookingNotification(dealerID) {
    return this.http.get(this.constant.BookingNotification + dealerID);
  }

  public randomCars() {
    const id_1 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    const id_2 = Math.floor(Math.random() * (3948 - 1990)) + 1990;
    return this.http.post(
      this.constant.randomCars,
      { car_1: id_1, car_2: id_2 },
      this.constant.httpOptions
    );
  }

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

  public getDealerName(dealerID) {
    return this.http.get(this.constant.dealerName + dealerID);
  }

  public getUserCars(userInformation) {
    return this.http.get(this.constant.getShowroomCars + userInformation.uid);
  }

  public placeRequest(requestData) {
    return this.http.post(
      this.constant.placeRequest,
      requestData,
      this.constant.httpOptions
    );
  }

  public removeUserShowrromCar(itemID, uid) {
    return this.http.post(
      this.constant.removeUserCar,
      { itemID: itemID, uid: uid },
      this.constant.httpOptions
    );
  }

  public createPasswordNewToken(email) {
    return this.http.post(
      this.constant.newPassordToken,
      { email: email },
      this.constant.httpOptions
    );
  }

  public updatePassword(newPassword, passwordToken) {
    return this.http.post(
      this.constant.updatePassword,
      { password: newPassword, passwordToken: passwordToken },
      this.constant.httpOptions
    );
  }

  public rejectOffer(itemID) {
    return this.http.get(this.constant.reject + itemID);
  }

  public getFilterByType(carType: any, maxPrice: string) {
    return this.http.post(
      this.constant.getByType,
      { car_type: carType, max_price: maxPrice },
      this.constant.httpOptions
    );
  }
}
