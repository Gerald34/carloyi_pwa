import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-carimages',
  templateUrl: './carimages.component.html',
  styleUrls: ['./carimages.component.css']
})
export class CarimagesComponent implements OnInit {
  allCars: any;
  imagepath = 'http://carloyi.com/car_images/live/';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.checkImages();
  }

  public checkImages() {
    return this.http.get('http://localhost:8000/api/allCars').subscribe(
        (filterResults: any) => {
          this.allCars = filterResults;
        }
      );
  }

}
