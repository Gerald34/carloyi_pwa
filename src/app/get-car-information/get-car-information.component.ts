import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {SearchService} from '../services/search.service';
import {ApiMethodsService} from '../services/api-methods.service';
import { ToastrService } from "ngx-toastr";
import { LoginService } from '../services/login.service';
import {ShowroomService} from "../services/showroom/showroom.service";
@Component({
  selector: 'app-get-car-information',
  templateUrl: './get-car-information.component.html',
  styleUrls: ['./get-car-information.component.css']
})
export class GetCarInformationComponent implements OnInit {
  itemID: string;
  carInformation: any;
  id: string;
  name: string;
  total_score: string;
  car_image: string;
  price: number;
  type: string;
  car_type: string;
  carrying_people: string;
  engine: string;
  torque_nm: string;
  acceleration_0_100: string;
  consumption_l_100km: string;
  verdict: string;
  engine_type: string;
  power_kw: string;

  state = this.storage.get('userInformation');
  readonly imagepath = "https://images.carloyi.com/";

  // API Hostname
  readonly apiHost = 'https://api.carloyi.com/index.php';
  readonly local = 'http://localhost:8000';
  model: any;

  // Set HTTP Headers
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Selected Model
  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));
  // carInformation = this.searchedCarResults[0];
  showroom = false;
  loggedIn = false;
  userDataInfo: any;
  errorMsg: any;

  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    public search: SearchService,
    public login: LoginService,
    private apiRequests: ApiMethodsService,
    private toastr: ToastrService,
    private showroomService: ShowroomService
  ) { }

  ngOnInit() {
    this.fetchCarInfo(this.itemID);
    if (this.state !== null) {
      this.loggedIn = true;
      this.userDataInfo = this.state.data;
    }
    this.login.userLoginSubject.subscribe((data: any) => {
      if (data.status === 'active') {
        this.loggedIn = true;
        this.userDataInfo = data.data;
      }
    });
  }

  /**
   * Fetch Car Information
   * @param itemID
   * @returns { Subscription }
   */
  public fetchCarInfo(itemID: string) {
    this.apiRequests.getFullCarInformation(itemID).subscribe((returnInformation: any) => {
      this.carInformation = returnInformation.carInformation[0];
      this.id = this.carInformation.id;
      this.name = this.carInformation.name;
      this.total_score = this.carInformation.total_score;
      this.car_image = this.carInformation.car_image;
      this.price = this.carInformation.price;
      this.type = this.carInformation.type;
      this.car_type = this.carInformation.car_type;
      this.carrying_people = this.carInformation.carrying_people;
      this.engine = this.carInformation.engine;
      this.torque_nm = this.carInformation.torque_nm;
      this.acceleration_0_100 = this.carInformation.acceleration_0_100;
      this.consumption_l_100km = this.carInformation.consumption_l_100km;
      this.verdict = this.carInformation.verdict;
      this.engine_type = this.carInformation.engine_type;
      this.power_kw = this.carInformation.power_kw;
    });
  }

  /**
   * Save Car Into Showroom
   * @param carID
   * @returns {Subscription}
   */
  private saveCarIntoShowroom(carID) {

    const userUID_CID = {
      uid: this.userDataInfo[0].id,
      cid: carID
    };

    this.showroomService.saveCarsIntoShowroom(userUID_CID).subscribe((response: any) => {
      if (response.code === 1) {
        this.toastr.success(
            'Car successfully saved (Check Your Showroom)',
            'Congratulations!');
        this.showroom = true;
      } else {
        this.toastr.success(
            'Car was not saved: ' + response.error,
            'Error/Warning!');
        this.showroom = false;
      }
    });
  }

}
