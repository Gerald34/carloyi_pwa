import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class ConstantsService {
  // Server URL's
  readonly api = "https://api.carloyi.com/index.php";
  readonly nodeServer = "https://154.66.197.198:8080";
  readonly local = "http://localhost:8000";
  readonly imagePath = "https://carloyi.com/car_images/live/";

  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };

  // API Endpoints
  readonly login = this.api + "/api/signin";
  readonly deals = this.api + "/api/portal/deals/";
  readonly placeOffer = this.api + "/api/portal/placeoffer";
  readonly getEntries = this.api + "/api/portal/";
  readonly getDealerCars = this.api + "/api/portal/floorCars/";
  readonly getbrands = this.api + "/api/brands";
  readonly getBrandModel = this.api + "/api/brands/";
  readonly addCar = this.api + "/api/showroom/add";
  readonly register = this.api + "/api/register";
  readonly interested = this.api + "/api/showroom/interested/";
  readonly getCarInformation = this.api + "/api/carsearch/getCarInfo/";
  readonly getMakes = this.api + "/api/brands";
  readonly getBrandModels = this.api + "/api/brands/";
  readonly findModelByID = this.api + "/api/carsearch/specific/";
  readonly suitabilitySearch = this.api + "/api/allCars";
  readonly searchByAffordability = this.api + "/api/affordability";
  readonly newsletter = this.api + "/api/newsletter";
  readonly getOfferInformation = this.api + "/api/showroom/offerInformation/";
  readonly bookTestDrive = this.api + "/api/showroom/booking";
  readonly BookingNotification = this.nodeServer + "/booking?dealerID=";
  readonly randomCars = this.api + "/api/carsearch/randomcars";
  readonly randomCarsFour = this.api + "/api/carsearch/randomcarsfour";
  readonly dealerName = this.api + "/api/dealerName/";
  readonly getShowroomCars = this.api + "/api/showroom/cars/";
  readonly placeRequest = this.api + "/api/showroom/placerequest";
  readonly removeUserCar = this.api + "/api/showroom/removeCar";
  readonly newPassordToken = this.api + "/api/newPasswordToken";
  readonly updatePassword = this.api + "/api/updatePassword";
  readonly reject = this.api + "/api/showroom/reject/";
  readonly getByType = this.api + "/api/carsearch/type";
  readonly updateUserDetails = this.api + '/api/showroom/updateprofile';

  // Node Server Related
  readonly notificationSubscription = this.api + '/api/push_notifications/subscribe';
  readonly requestNotification = this.api + '/api/push_notifications/request_push_message';

  constructor() {}
}
