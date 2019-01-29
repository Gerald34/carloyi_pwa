import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiMethodsService } from "../services/api-methods.service";
import { SearchService } from "../services/search.service";
import swal from "sweetalert2";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { HomeComponent } from "../home/home.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-affordability-search",
  templateUrl: "./affordability-search.component.html",
  styleUrls: ["./affordability-search.component.css"]
})
export class AffordabilitySearchComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private ApiMethods: ApiMethodsService,
    private searchService: SearchService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private HomeComp: HomeComponent
  ) {}

  ngOnInit() {}

  /**
   * HTTP Post request
   * Search by salary and expenses
   * @url .../api/affordability
   * @param salary
   * @param expenses
   * @returns {Subscription}
   */
  public searchByAffordability(salary: any, expenses: any) {
    const userFinance = {
      income: salary.value,
      expenses: expenses.value
    };

    return this.ApiMethods.affordability(userFinance).subscribe((data: any) => {
      if (data.successCode === 201) {
        // this.toastr
        //   .success(
        //     data.length + ' Cars Found',
        //     'Max Price: ' + data.finance_amount,
        //     {
        //       timeOut: 10000,
        //       extendedTimeOut: 3000,
        //       easing: 'ease-in',
        //       easeTime: 800,
        //       progressAnimation: 'decreasing',
        //       toastClass: 'toast',
        //       titleClass: 'toast-title',
        //       messageClass: 'toast-message',
        //       tapToDismiss: true
        //     }
        //   );

        this.searchService.setStorageItem("searchedCarResults", {
          results: data,
          type: "affordability"
        });

        this.storage.set("car_type", {
          data: data,
          type: "affordability",
          title: "Be more specific"
        });
        this.searchService.storeSearchData(data);
        this.router.navigate(["results"]);
      } else {
        swal("Warning", data.error, "warning");
      }
    });
  }
}
