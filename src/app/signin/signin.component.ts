import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import swal from "sweetalert2";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { SearchService } from "../services/search.service";
import { LoginService } from "../services/login.service";
import { ServiceWorkerModule, SwUpdate, SwPush } from "@angular/service-worker";
// import * as io from 'socket.io-client';
import { WebSocketService } from "../services/web-socket.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AuthService } from "../services/auth.service";
import { ApiMethodsService } from "../services/api-methods.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  loginReturn: any;
  notifications: Subject<any>;
  // private socket; // Socket that connects to our socket.io server
  // API Location
  readonly apiDomain = "https://api.carloyi.com/index.php";
  readonly local = "http://localhost:8000";
  errorMsg: string;
  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  };

  contentEditable = false;

  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    private header: HeaderComponent,
    public login: LoginService,
    private update: SwUpdate,
    private push: SwPush,
    private webpush: SwPush,
    private wsService: WebSocketService,
    private authService: AuthService,
    private apiMethods: ApiMethodsService
  ) {
    // this.notifications = <Subject<any>>wsService
    //   .connect()
    //   .map((response: any): any => {
    //     return response;
    //   });
  }

  // public sendNotification(data) {
  //   this.notifications.next(data);
  // }

  toggleEditable(event) {
    if (event.target.checked) {
      this.contentEditable = true;
    }
  }

  /**
   * Sign In
   * @param emailData
   * @param passwordData
   * @returns {Subscription}
   */
  public userSignIn(emailData, passwordData) {
    const email = emailData;
    const password = passwordData;

    if (this.contentEditable === true) {
      this.authService
        .resetPassword(email)
        .then(resolve => {
          if (resolve === "sent") {
            swal(
              "Password Reset Successful",
              "Reset link has been sent to " + email,
              "success"
            );
            setTimeout(function() {
              location.reload();
            }, 2000);

            // return this.apiMethods
            //   .createPasswordNewToken(email)
            //   .subscribe((data: any) => {
            //     if (typeof data.successCode !== "undefined") {
            //       console.log("refreshed");
            //       // swal('Password Reset Successful', data.successMessage, 'success');
            //     } else {
            //       // swal('New Password Error', data.errorMessage, 'error');
            //     }
            //   });
          } else {
            swal("Reset Password Error", resolve.message, "error");
          }
        })
        .catch((error: any) => {
          swal("Reset Password Error", error.message, "error");
        });
    } else {
      return this.authService
        .login(email, password)
        .then(resolve => {
          if (typeof resolve.user !== "undefined") {
            this.apiMethods
              .login(email, password)
              .subscribe((loginReturn: any) => {
                if (loginReturn.successCode === 201) {

                  const loginInformation = {
                    status: "active",
                    data: loginReturn.userData
                  };

                  const userID = loginReturn.userData.id;

                  this.wsService.getNotifications(userID);

                  this.login.watchLogin(loginInformation);
                  const name =
                    loginReturn.userData.name[0].toUpperCase() +
                    loginReturn.userData.name.substr(1);
                  const surname =
                    loginReturn.userData.lastName[0].toUpperCase() +
                    loginReturn.userData.lastName.substr(1);
                  swal(
                    "Access Granted",
                    "Welcome back " + name + " " + surname,
                    "success"
                  );

                  this.storage.set("userInformation", loginReturn);
                } else {
                  this.login.watchLogin("inactive");
                  swal("Could not log in!", loginReturn.errorMessage, "error");
                }
              });

            this.storage.set("authState", resolve);
            setTimeout(() => {
              this.router.navigate(["showroom"]);
            }, 3000);
          } else {
            swal("Login Error", resolve.message, "error");
          }
        })
        .catch(error => (this.errorMsg = error.message));
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
