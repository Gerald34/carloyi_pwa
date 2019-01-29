import { Component, OnInit, Input } from '@angular/core';
import { CarResult } from '../models/car-result.model';
import { AffordabilityComponent } from '../affordability/affordability.component';
import { ApiMethodsService } from '../services/api-methods.service';
import { SearchService } from '../services/search.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-car-result',
  templateUrl: './car-result.component.html',
  styleUrls: ['./car-result.component.css']
})
export class CarResultComponent implements OnInit {

  @Input() carResult: CarResult;
  imagepath = 'https://carloyi.com/car_images/live/';
  id: string;
  name: string;
  total_score: string;
  car_image: string;
  price: number;
  type: string;
  car_type: string;
  carInformation: any;

  constructor(
    public affordability: AffordabilityComponent,
    private apiMethods: ApiMethodsService,
    public searchService: SearchService,
    public appComp: AppComponent
  ) { }

  ngOnInit(filterCar = this.carResult) {
    this.id = filterCar.id;
    this.name = filterCar.name;
    this.total_score = filterCar.total_score;
    this.car_image = filterCar.car_image;
    this.type = filterCar.type;
    this.car_type = filterCar.car_type;
    this.price = filterCar.price;
  }

}
