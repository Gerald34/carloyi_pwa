import { Component, OnInit, Inject, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AffordabilityComponent } from '../affordability/affordability.component';
import { CarResult } from '../models/car-result.model';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import { CarList } from '../models/car-list.model';
@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  @Input() thCars: CarResult;

  readonly apiHost = 'https://api.carloyi.com/index.php';
  readonly local = 'http://localhost:8000';
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));
  carsData = this.searchedCarResults.results.data;
  carType = this.searchedCarResults.car_type;
  imagepath = 'https://images.carloyi.com/';
  carInformation: any;
  userInfo: any = JSON.parse(this.storage.get('userDataInfo'));
  showroom = false;
  methods: any;
  cars: CarList;

  constructor(
    public afford: AffordabilityComponent,
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  public getCarID(carID: any) {
    this.afford.saveIntoShowroom(carID);
  }

  ngOnInit() {

    this.methods = this.afford;
    // this.searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));

    if (this.searchedCarResults.results.data === null ) {
      this.afford.redirect('');
    } else {
      this.cars = new CarList();
      // this.cars.name =
    }

  }

}
