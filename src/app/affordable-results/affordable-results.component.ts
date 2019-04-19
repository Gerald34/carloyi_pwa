import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AffordabilityComponent } from '../affordability/affordability.component';

@Component({
  selector: 'app-affordable-results',
  templateUrl: './affordable-results.component.html',
  styleUrls: ['./affordable-results.component.css']
})
export class AffordableResultsComponent implements OnInit {

  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));
  carsData = this.searchedCarResults.results.data;
  carType = this.searchedCarResults.car_type;
  imagepath = "https://images.carloyi.com/";

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private afford: AffordabilityComponent
  ) { }

  public getCarID(carID: any) {
    this.afford.saveIntoShowroom(carID);
  }

  ngOnInit() {
    if (this.searchedCarResults.results.data === null ) {
      this.afford.redirect('');
    }

  }

}
