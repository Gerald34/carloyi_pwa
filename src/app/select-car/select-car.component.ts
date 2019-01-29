import { Component, Inject, OnInit } from "@angular/core";
import { ApiMethodsService } from "../services/api-methods.service";
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import swal from "sweetalert2";
import { SearchService } from "../services/search.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-select-car",
  templateUrl: "./select-car.component.html",
  styleUrls: ["./select-car.component.css"]
})
export class SelectCarComponent implements OnInit {
  allMakes: any;
  allMakesCheck: boolean;
  makeModel: any;
  returnMakeModel: any;
  selectedModelID: any;
  loading = true;
  constructor(
    private ApiMethods: ApiMethodsService,
    private searchService: SearchService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }

    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngOnInit() {
    this.getMakes();
  }

  /**
   * Get all available makes
   * @url /api/brands
   * @returns { Subscription }
   */
  public getMakes() {
    return this.ApiMethods.getMakes().subscribe((data: any) => {
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
          // this.toastr.success(
          //   data.data.length + ' Cars Found',
          //   'Brand and Model search results',
          //   {
          //     timeOut: 10000,
          //     extendedTimeOut: 3000,
          //     easing: 'ease-in',
          //     easeTime: 800,
          //     progressAnimation: 'decreasing',
          //     toastClass: 'toast',
          //     titleClass: 'toast-title',
          //     messageClass: 'toast-message',
          //     tapToDismiss: true,
          //     closeButton: true
          //   }
          // );
          this.setStorageItem("searchedCarResults", {
            results: data,
            type: "modelSearch"
          });

          this.storage.set("car_type", {
            data: data.car_type,
            type: "modelSearch",
            max_price: data.data[0].price,
            title: "Compare Below"
          });
          this.searchService.storeSearchData(data);
          this.router.navigate(["results"]);
        } else {
          // this.spinnerService.hide();
          swal("Warning", data.error, "warning");
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
