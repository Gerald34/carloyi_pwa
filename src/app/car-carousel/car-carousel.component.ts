import { Component, OnInit, Input } from '@angular/core';
import { ConstantsService } from '../services/constants.service';
import { AffordabilityComponent } from '../affordability/affordability.component';
import { NguCarouselConfig } from '@ngu/carousel';
import { MatDialog } from '@angular/material/dialog';
import { GetCarInformationComponent } from "../get-car-information/get-car-information.component";

@Component({
  selector: 'app-car-carousel',
  templateUrl: './car-carousel.component.html',
  styleUrls: ['./car-carousel.component.css']
})
export class CarCarouselComponent implements OnInit {

  @Input('car-list') carList;
  cars = this.carList;
  imagepath = this.path.imagePath;
  public carouselTileItems: Array<any>;

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 5, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(1, 1, 0.1, 1)'
  };

  constructor(
    public path: ConstantsService,
    public afford: AffordabilityComponent,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carouselTileItems = this.carList;
  }

  getCarInfo(itemID): void {
    const dialogRef = this.dialog.open(GetCarInformationComponent, {
      width: '1200px'
    });
    dialogRef.componentInstance.itemID = itemID;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
