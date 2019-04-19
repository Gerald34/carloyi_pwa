import { Component, OnInit, Inject } from "@angular/core";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AffordabilityComponent } from "../affordability/affordability.component";
import { UtilService } from "../services/util.service";
// import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiMethodsService } from "../services/api-methods.service";
import { MatDialog } from '@angular/material/dialog';
import { GetCarInformationComponent } from "../get-car-information/get-car-information.component";
declare var $: any;
@Component({
  selector: "app-filter-search",
  templateUrl: "./filter-search.component.html",
  styleUrls: ["./filter-search.component.css"]
})
export class FilterSearchComponent implements OnInit {
  sortFields: Array<string> = ["price", "total_score", "name", "car_type"];
  // sortField = 'price';
  sortDirection = "asc";
  readonly apiHost = "https://api.carloyi.com/index.php";
  readonly local = "http://localhost:8000";
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  filterResults: any;
  // Pagination Properties
  page: any;
  collection: any[];
  type: any;

  // Search Filter defaults
  cars_found: any;
  minPrice: any = 80000;
  maxPrice: any = 350000;
  seats = 2;
  carType: any;
  fuel_consumption: any = 0;
  practicality: any = 0;
  comfort: any = 0;
  enjoyment: any = 0;
  performance: any = 0;
  reliability: any = 0;
  city_driving: any = 0;
  long_distance: any = 0;
  moving_luggage: any = 0;
  offroad: any = 0;
  carTypes: any;
  selectedCarType: any[] = [];
  filterType: any;
  checked: boolean;
  imagepath = "https://images.carloyi.com/";
  seachType = this.storage.get("car_type");
  searchedCarResults = JSON.parse(this.storage.get("searchedCarResults"));

  // Default Checkboxes
  family_car: any = null;
  suitable = this.storage.get("car_type");
  multiChecked: boolean[] = [];
  carInformation: any;
  userInfo: any = JSON.parse(this.storage.get("userDataInfo"));
  showroom = false;
  methods: any;
  title: string;
  getCarID: string;

  /**
   * Constructor
   * @param http
   * @param storage
   * @param afford
   * @param loadingBar
   * @param router
   * @param utilService
   * @param apiRequests
   * @param toastr
   */
  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public afford: AffordabilityComponent,
    private router: Router,
    private utilService: UtilService,
    private apiRequests: ApiMethodsService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  /**
   * Initialize
   */
  ngOnInit() {
    $(".irs-with-grid")
      .find(".irs-single")
      .css("background", "#0000");

    this.methods = this.afford;

    // Get car type
    this.getCarType();

    // Get Filter Cars
    if (this.seachType.type === "modelSearch") {
      this.suitablecars();
      this.title = this.seachType.title;
    } else if (this.seachType.type === "suitabilitySearch") {
      const collection = Object.values(this.seachType.data);
      this.collection = collection;
      this.cars_found = collection.length;
      this.title = this.seachType.title;
    } else if (this.seachType.type === "affordability") {
      const financeAmount = {
        amount: this.searchedCarResults.results.finance_amount
      };

      const collection = Object.values(this.searchedCarResults.results.data);
      // const collection = sorting.total_score.sort();
      this.collection = collection;
      this.cars_found = collection.length;
      this.title = this.seachType.title;
    }
  }

  /**
   * Search cars by finance amount
   * @url /api/byAmount
   * @returns {Subscription}
   */
  public searchByPrice(financeAmount) {
    return this.http
      .post(this.apiHost + "/api/byAmount", financeAmount, this.httpOptions)
      .subscribe((data: any) => {
        const collection = Object.values(data.data);
        this.collection = collection;
        this.cars_found = collection.length;
      });
  }

  /**
   * Get all suitable extras
   * @url /api/carsearch/type
   * @returns {Subscription}
   */
  private suitablecars() {
    const carType = this.suitable.data;

    const maxPrice = this.suitable.max_price;

    /**
     * Filter Type Http Request
     */
    return this.apiRequests
      .getFilterByType(carType, maxPrice)
      .subscribe((data: any) => {
        if (data.data.length > 0) {
          this.filterResults = data.data;
          // this.type = suitableOptions.type.car_type;
          this.page = 1;
          this.collection = this.filterResults;
          this.cars_found = this.filterResults.length;
          const theType = $("#" + this.filterType.carType);
          if (this.filterType.carType === theType.val()) {
            $(".the_input")
              .find("#" + theType.val())
              .each(function() {
                $("input:checkbox[name=" + theType.val() + "]").is(":checked");
              });
          } else {
            this.checked = false;
          }
        }
      });
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

  /**
   *
   * @returns {Subscription}
   */
  private getCarType() {
    return this.http
      .get(this.apiHost + "/api/carsearch/filter-options")
      .subscribe((carTypes: any) => {
        this.carTypes = carTypes.data.car_types;
      });
  }

  /**
   *
   * @param {string} type
   * @param event
   */
  public getValue(type: string, event) {
    this.selectedCarType.push(event.source.value);
    console.log(this.selectedCarType);
  }

  /**
   *
   * @param event
   */
  public getBudget(event) {
    this.minPrice = event.from;
    this.maxPrice = event.to;
  }

  /**
   *
   * @param event
   */
  public getFuel(event) {
    this.fuel_consumption = event.from;
  }

  /**
   *
   * @param event
   */
  public getEnjoyment(event) {
    this.enjoyment = event.from;
  }

  /**
   *
   * @param event
   */
  public getPracticality(event) {
    this.practicality = event.from;
  }

  /**
   *
   * @param event
   */
  public getPerformance(event) {
    this.performance = event.from;
  }

  /**
   *
   * @param event
   */
  public getComfort(event) {
    this.comfort = event.from;
  }

  /**
   *
   * @param event
   */
  public getReliability(event) {
    this.reliability = event.from;
  }

  /**
   *
   * @param event
   */
  public getDriving(event) {
    this.city_driving = event.from;
  }

  /**
   *
   * @param event
   */
  public getSeats(event: any) {
    this.seats = event.from;
  }

  /**
   *
   * @param event
   */
  public getDistance(event) {
    this.long_distance = event.from;
  }

  /**
   * Get Luggage Value
   * @param event
   */
  public getLuggage(event) {
    this.moving_luggage = event.from;
  }

  /**
   * Get Off-Road Value
   * @param event
   */
  public getRoad(event) {
    this.offroad = event.from;
  }

  /**
   *
   * @param family_car
   */
  public familyFinish(family_car) {
    this.family_car = family_car.to;
  }

  /**
   *
   * @returns {Subscription}
   */
  public filterSearch() {

    if (this.selectedCarType.length > 0) {
      $(".theSearch").css("opacity", "0.2");
      const filterData = {
        price_max: this.maxPrice,
        price_min: this.minPrice,
        car_type: this.selectedCarType,
        fuel_consumption: this.fuel_consumption,
        practicality: this.practicality,
        comfort: this.comfort,
        enjoyment: this.enjoyment,
        performance: this.performance,
        reliability: this.reliability,
        city_driving: this.city_driving,
        long_distance: this.long_distance,
        moving_luggage: this.moving_luggage,
        seats: this.seats,
        offroad: this.offroad
      };

      $("html, body").animate({ scrollTop: $(".allCars").offset().top }, 1000);
      return this.apiRequests.filters(filterData).subscribe((filterResults: any) => {
        if (filterResults.successCode === 1) {
          setTimeout(() => {
            this.filterResults = filterResults.data;
            this.page = 1;
            this.collection = this.filterResults;
            this.cars_found = this.filterResults.length;

            $(".theSearch").css("opacity", "1");

          }, 4000);
        } else if (filterResults.code === -1) {
          setTimeout(() => {
            $(".theSearch").css("opacity", "1");
          }, 4000);
        } else {
          setTimeout(() => {
            $(".theSearch").css("opacity", "1");
          }, 4000);
        }
      });

    } else {
      this.toastr.warning('Car type not selected', 'Filter search warning');
    }

  }

  /**
   *
   */
  public reset() {
    location.reload();
  }
}

// fm 11 vw gp
