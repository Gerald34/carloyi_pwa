import { Component, OnInit, Input } from '@angular/core';
import { CarList } from '../models/car-list.model';
import { ConstantsService } from '../services/constants.service';
import { AffordabilityComponent } from '../affordability/affordability.component';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-car-carousel',
  templateUrl: './car-carousel.component.html',
  styleUrls: ['./car-carousel.component.css']
})
export class CarCarouselComponent implements OnInit {

  @Input('car-list') carList: CarList;
  cars = this.carList;

  public carouselTileOneItems: Array<any> = [];
  public carouselTileOne: NgxCarousel;
  imgags: string[];

  constructor(
    public path: ConstantsService,
    public afford: AffordabilityComponent
  ) { }

  ngOnInit() {

    this.imgags = [
      'assets/bg.jpg',
      'assets/car.png',
      'assets/canberra.jpg',
      'assets/holi.jpg'
    ];

    this.carouselTileOne = {
      grid: { xs: 1, sm: 1, md: 3, lg: 4, all: 0 },
      speed: 1000,
      point: {
        visible: true,
      },
      load: 2,
      loop: false,
      touch: true,
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      animation: 'lazy',
      slide: 4
    };

  }

  public carouselTileOneLoad() {
    const len = this.carouselTileOneItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTileOneItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

}
