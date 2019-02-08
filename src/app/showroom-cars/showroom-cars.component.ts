import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { LoginService } from "../services/login.service";
import { ApiMethodsService } from "../services/api-methods.service";
import { ConstantsService } from "../services/constants.service";
import swal from "sweetalert2";
import { ShowroomComponent } from "../showroom/showroom.component";
import { ToastrService } from "ngx-toastr";
// import * as Swal from 'sweetalert2';
@Component({
  selector: "app-showroom-cars",
  templateUrl: "./showroom-cars.component.html",
  styleUrls: ["./showroom-cars.component.css"]
})
export class ShowroomCarsComponent implements OnInit {
  data = this.storage.get("userInformation");
  userDataInfo = this.data.userData;
  empty: boolean;
  allUserCars: any;
  page: any;
  imagePath: string;
  itemID_1: any;
  uid_1: any;
  user_email_1: any;
  name: string;
  surname: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public login: LoginService,
    public apiMethods: ApiMethodsService,
    public constants: ConstantsService,
    public showRoomMethods: ShowroomComponent,
    private toastr: ToastrService
  ) {
    this.imagePath = this.constants.imagePath;
  }

  ngOnInit() {

    this.login.userLoginSubject.subscribe((data: any) => {
      this.userDataInfo = data.userData;
    });

    const userID = this.userDataInfo.id;
    this.showroomInformation(userID);
  }

  /**
   *
   * @returns {Subscription}
   */
  public showroomInformation(userID) {
    const userInformation = {
      uid: userID
    };

    this.showroomCars(userInformation);
  }

  /**
   * Get Cars
   * @returns {Subscription}
   */
  public showroomCars(userInformation) {
    this.apiMethods.getUserCars(userInformation).subscribe((data: any) => {
      if (data.code === -1) {
        this.empty = true;
      } else {
        this.empty = false;
        this.allUserCars = data[0].data.cars.data;
        this.page = 1;
        $(function() {
          if (data[0].code === 1) {
            $(".footer").css("position", "relative");
          } else {
            $(".footer").css("position", "absolute");
          }
        });
      }
    });
  }

  /**
   * Remove Car
   * @param itemID
   * @param uid
   */
  public removeCar(itemID, uid) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.apiMethods
          .removeUserShowroomCar(itemID, uid)
          .subscribe((data: any) => {
            if (typeof data.successCode) {
              swal("Deleted!", "Your Car has been deleted.", "success");
              // this.toastr.success(data.successMessage, 'Great', {});
              this.allUserCars = data[0].data.cars.data;
            } else {
              this.toastr.error(data.errorMessage, "Error", {});
              this.allUserCars = null;
            }
          });
      }
    });
  }
}
