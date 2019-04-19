import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SearchService } from "../services/search/search.service";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
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
    private searchService: SearchService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {}

  ngOnInit() {}

  /**
   * HTTP Post request
   * Search by salary and expenses
   */
  public searchByAffordability(salary: any, expenses: any) {
    const userFinance = { income: salary.value, expenses: expenses.value };
    return this.searchService.affordability(userFinance).subscribe((data: any) => {
      if (data.successCode === 201) {
        this.searchService.setStorageItem("searchedCarResults", {
          results: data,
          type: "affordability"
        });

        this.storage.set("car_type", {
          data: data,
          type: "affordability",
          title: "Be more specific"
        });
        this.searchService.storeSearchData({ response: true });
        this.router.navigate(["results"]);
      } else {
        this.toastr.warning(data.error, "Warning");
      }
    });
  }
}
