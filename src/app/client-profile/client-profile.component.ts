import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from "sweetalert2";
import { NavigationEnd, Router } from "@angular/router";
import {
  LOCAL_STORAGE,
  WebStorageService,
  isStorageAvailable
} from "angular-webstorage-service";
// import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../services/login.service";
@Component({
  selector: "app-client-profile",
  templateUrl: "./client-profile.component.html",
  styleUrls: ["./client-profile.component.css"]
})
export class ClientProfileComponent implements OnInit {
  // API Location
  readonly apiDomain = "https://api.carloyi.com/index.php";
  readonly local = "http://localhost:8000";
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // All Local Storage Data
  data = this.storage.get("userInformation");
  userDataInfo = this.data.userData;
  searchedCarResults = JSON.parse(this.storage.get("searchedCarResults"));
  nations: any;
  updateData: any;
  response: any;
  nationality: string = this.userDataInfo.nationality;
  agreement: any;
  gender: any = this.userDataInfo.gender;
  nationalityObject: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.getNationality();
    if (this.nationality === null) {
      this.nationalityObject = false;
      console.log("its null");
    } else {
      this.nationalityObject = true;
      console.log("Not Null");
    }
    this.login.userLoginSubject.subscribe((data: any) => {
      this.userDataInfo = data.userData;

      if (this.userDataInfo.nationality === null) {
        this.nationalityObject = false;
        console.log("its null");
      } else {
        this.nationalityObject = true;
        console.log("Not Null");
      }
    });
    // $('select[name="options"]').find('option[value="3"]').attr("selected",true);
  }

  onNationalityChange(event) {
    this.nationality = event.target.value;
  }

  onGenderChange(event) {
    this.gender = event.target.value;
  }
  /**
   * Get all countries
   * @url { https://restcountries.eu/rest/v2/all }
   * @returns {Subscription}
   */
  public getNationality() {
    return this.http
      .get("https://restcountries.eu/rest/v2/all")
      .subscribe(nations => {
        this.nations = nations;
      });
  }

  toggleEditable(event) {
    if (event.target.checked) {
      this.agreement = "on";
    }
  }

  /**
   * Collect User data then parse the object to update method
   * @method _updateProfile()
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} contactNumber
   * @param {string} nationality
   * @param {string} identityNumber
   * @param {string} gender
   * @param {string} agreement
   * @param {string} userID
   * @returns {Subscription}
   */
  public getUpdateData(
    email: any,
    firstName: any,
    lastName: any,
    contactNumber: any,
    userID: any
  ) {
    // User data
    const updateProfileData = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      contactNumber: contactNumber.value,
      nationality: this.nationality,
      gender: this.gender,
      agreement: this.agreement,
      userID: this.userDataInfo.id
    };

    if (this.agreement === "on") {
      return this._updateProfile(updateProfileData);
    } else {
      swal("Notice!", "Please consent to the terms of use", "warning");
    }
  }

  /**
   * Update user Profile
   * @url { .../api/showroom/updateprofile }
   * @param updateProfileData
   * @returns {Subscription}
   * @private
   */
  private _updateProfile(updateProfileData: any) {
    return this.http
      .post(
        this.apiDomain + "/api/showroom/updateprofile",
        updateProfileData,
        this.httpOptions
      )
      .subscribe((updateData: any) => {
        if (typeof updateData.successCode !== "undefined") {
          this.response = updateData.successMessage;
          this.toastr.success(this.response, "Great!");

          this.storage.set("userInformation", updateData);
          this.data = this.storage.get("userInformation");

          console.log(this.data);
          this.userDataInfo = updateData.userData;
          // swal('Great!', this.response, 'success');
        } else {
          this.response = this.updateData.errorMessage;
          swal("Sorry", this.response, "warning");
        }
      });
  }
}
