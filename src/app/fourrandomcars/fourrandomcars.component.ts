import {Component, Inject, OnInit} from '@angular/core';
import { UriService } from '../services/uri/uri.service';
import { GeneralService } from '../services/general/general.service';
import {SearchService} from "../services/search/search.service";
import {Router} from "@angular/router";
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-fourrandomcars',
  templateUrl: './fourrandomcars.component.html',
  styleUrls: ['./fourrandomcars.component.css']
})
export class FourrandomcarsComponent implements OnInit {
  specials: any;
  imagepath = this.uri.imagePath;
  constructor(
    private uri: UriService,
    private generalMethods: GeneralService,
    private searchService: SearchService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // this.fetchRandomCars();
    this.getCars();
  }

  getCars() {
    this.generalMethods.getSpecials().subscribe((data: any) => {
      this.specials = data;
    });
  }

  public fetchRandomCars() {
    this.generalMethods.fourRandomCars().subscribe((data: any) => {
      // this.randomCars = data;
    });
  }

  public getCarInfo(itemID) {

  }

  /**
   * HTTP GET Request
   * Model ID
   * @returns {Subscription}
   */
  public searchByModelID(modelID) {
    return this.searchService.findModelByID(modelID).subscribe(
        (data: any) => {
          if (data.code === 1) {
            this.setStorageItem("searchedCarResults", {
              results: data,
              type: "modelSearch"
            });

            this.storage.set("car_type", {
              data: data.car_type,
              type: "modelSearch",
              max_price: data.max_price,
              title: "Compare Below"
            });

            this.searchService.storeSearchData({ response: true });
            this.router.navigate(["results"]);
          } else {
            this.searchService.storeSearchData({ response: false });
            this.toastr.error(data.error, "Search gone wrong", {
              positionClass: "toast-top-center",
              timeOut: 10000,
              closeButton: true
            });
          }
        }
    );
  }

  /**
   * @param {string} storageSession
   * @param arrayData
   */
  public setStorageItem(storageSession: string, arrayData: any) {
    this.storage.set(storageSession, JSON.stringify(arrayData));
  }

}
