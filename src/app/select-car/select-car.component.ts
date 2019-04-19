import { Component, Inject, OnInit } from "@angular/core";
import { ApiMethodsService } from "../services/api-methods.service";
import { SearchService } from "../services/search/search.service";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-select-car",
  templateUrl: "./select-car.component.html",
  styleUrls: ["./select-car.component.css"]
})
export class SelectCarComponent implements OnInit {
  brands: any;
  allMakesCheck: boolean;
  makeModel: any;
  returnMakeModel: any;
  selectedModelID: any;
  loading = true;
  allMakes: any;
  constructor(
    private ApiMethods: ApiMethodsService,
    private searchService: SearchService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getMakes();
  }

  // Get all available makes
  public getMakes() {
    return this.searchService.getBrands().subscribe((data: any) => {
      this.allMakesCheck = true;
      this.allMakes = data;
    });
  }

  /**
   * Get model ID from make ID
   * @param event
   * @returns {Subscription}
   */
  public getModelsID(event: any) {
    this.makeModel = event.target.value;
    return this.getBrandModels(this.makeModel);
  }

  /**
   * Get all models by brand ID
   * @url /api/brands/id
   * @param {number} id
   * @returns {Subscription}
   */
  public getBrandModels(id: number) {
    this.ApiMethods.getBrandModels(id).subscribe((data: any) => {
      this.returnMakeModel = data.models;
      $(function() {
        $("#makeModels").show();
      });
    });
  }

  /**
   *
   * @param event
   */
  public getSelectedModelsID(event: any) {
    this.selectedModelID = event.target.value;
  }

  /**
   * HTTP GET Request
   * Model ID
   * @returns {Subscription}
   */
  public searchByModelID() {
    return this.ApiMethods.findModelByID(this.selectedModelID).subscribe(
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
