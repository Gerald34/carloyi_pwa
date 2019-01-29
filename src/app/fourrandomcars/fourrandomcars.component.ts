import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants.service';
import {ApiMethodsService} from '../services/api-methods.service';

@Component({
  selector: 'app-fourrandomcars',
  templateUrl: './fourrandomcars.component.html',
  styleUrls: ['./fourrandomcars.component.css']
})
export class FourrandomcarsComponent implements OnInit {
  randomCars: any;
  imagepath = this.constants.imagePath;
  constructor(
    private constants: ConstantsService,
    private apiMethods: ApiMethodsService
  ) { }

  ngOnInit() {
    this.fetchRandomCars();
  }

  public fetchRandomCars() {
    this.apiMethods.fourRandomCars().subscribe((data: any) => {
      this.randomCars = data;
    });
  }

}
