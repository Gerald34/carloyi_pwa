import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class ConstantsService {
  // Server URL's
  readonly api = "https://api.carloyi.com/index.php";
  readonly nodeServer = "https://154.66.197.198:8080";
  readonly local = "http://localhost:8000";
  readonly imagePath = "https://images.carloyi.com/";

  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
    })
  };

  // General purpose routes
  readonly login = this.api + "/api/signin";
  readonly register = this.api + "/api/register";
  readonly newsletter = this.api + "/api/newsletter";
  readonly randomCars = this.api + "/api/carsearch/randomcars";
  readonly randomCarsFour = this.api + "/api/carsearch/randomcarsfour";
  
  // Search routes
  readonly filterSearch = this.api + '/api/carsearch/filter';
  readonly getByType = this.api + "/api/carsearch/type";
  readonly getCarInformation = this.api + "/api/carsearch/getCarInfo/";
  
  readonly getBrandModels = this.api + "/api/brands/";
  readonly findModelByID = this.api + "/api/carsearch/specific/";

  // Node Server Related
  readonly notificationSubscription = this.api + '/api/push_notifications/subscribe';
  readonly requestNotification = this.api + '/api/push_notifications/request_push_message';

  constructor() {}
}
