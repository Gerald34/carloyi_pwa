import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "../services/login.service";
import { ApiMethodsService } from '../services/api-methods.service';
import { ShowroomService } from '../services/showroom/showroom.service';

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
  agreement: any;

  nationality: string = this.userDataInfo.nationality;
  gender: string = this.userDataInfo.gender;
  nationalityObject = false;
  genderObject = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService,
    private login: LoginService,
    private showroomService: ShowroomService
  ) {}

  ngOnInit() {
    this.getNationality();

    if (this.nationality === null || this.nationality === '') {
      this.nationalityObject = false;
    } else {
      this.nationalityObject = true;
    }

    if (this.gender === null || this.gender === '') {
      this.genderObject = false;
    } else {
      this.genderObject = true;
    }

    // Update user information @realtime
    this.login.userLoginSubject.subscribe((data: any) => {
      this.userDataInfo = data.userData;
      if (this.userDataInfo.nationality === null) {
        this.nationalityObject = false;
      } else {
        this.nationalityObject = true;
      }
    });

  }

  onNationalityChange(event) {
    this.nationality = event.target.value;
  }

  onGenderChange(event) {
    this.gender = event.target.value;
  }

  // Get all countries
  public getNationality() {
    return this.http.get("https://restcountries.eu/rest/v2/all").subscribe(nations => {
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
   */
  public getUpdateData(
    email: any,
    firstName: any,
    lastName: any,
    contactNumber: any
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
      this.toastr.warning("Notice!", "Please consent to the terms of use");
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
    return this.showroomService.updateUserInformation(updateProfileData).subscribe((data: any) => {
      if (typeof data.successCode !== "undefined") {
        // Update current user data
        this.userDataInfo = data.userData;
        this.storage.set("userInformation", data);
        this.login.watchLogin(data);
        this.toastr.success(data.successMessage, "Great!");
      } else {
        this.response = this.updateData.errorMessage;
        this.toastr.warning("Sorry", this.response);
      }
    });
  }
}
