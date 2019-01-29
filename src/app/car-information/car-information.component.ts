import { Component, OnInit, Input } from '@angular/core';
import { AffordabilityComponent } from '../affordability/affordability.component';
import { FullCarInformation } from '../models/car-information.model';

@Component({
  selector: 'app-car-information',
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.css']
})
export class CarInformationComponent implements OnInit {

  @Input() getCarInfo: FullCarInformation;
  readonly imagepath = 'https://carloyi.com/car_images/live/';
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


  constructor(public affordability: AffordabilityComponent) { }

  ngOnInit(carInformation = this.getCarInfo) {
    this.id = carInformation.id;
    this.name = carInformation.name;
    this.total_score = carInformation.total_score;
    this.car_image = carInformation.car_image;
    this.price = carInformation.price;
    this.type = carInformation.type;
    this.car_type = carInformation.car_type;
    this.carrying_people = carInformation.carrying_people;
    this.engine = carInformation.engine;
    this.torque_nm = carInformation.torque_nm;
    this.acceleration_0_100 = carInformation.acceleration_0_100;
    this.consumption_l_100km = carInformation.consumption_l_100km;
    this.verdict = carInformation.verdict;
    this.engine_type = carInformation.engine_type;
    this.power_kw = carInformation.power_kw;
  }



}
