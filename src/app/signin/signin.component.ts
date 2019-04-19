import { Component, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { SwUpdate, SwPush } from "@angular/service-worker";
import { WebSocketService } from "../services/web-socket.service";
import { Subject } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ApiMethodsService } from "../services/api-methods.service";
import { ToastrService } from 'ngx-toastr';

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
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    public login: LoginService,
    private update: SwUpdate,
    private push: SwPush,
    private webpush: SwPush,
    private wsService: WebSocketService,
    private authService: AuthService,
    private apiMethods: ApiMethodsService,
    private toastr: ToastrService,
  ) {
  }

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
            this.toastr.success("Reset link has been sent to " + email, "Password Reset Successful");
            setTimeout(function() {
              location.reload();
            }, 2000);
          } else {
            this.toastr.error(resolve.message, "Reset Password Error");
          }
        })
        .catch((error: any) => {
          this.toastr.error(error.message, "Reset Password Error");
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
                  this.storage.set("userInformation", loginReturn);
                  this.toastr.success("Welcome back " + name + " " + surname, "Access Granted");
                } else {
                  this.login.watchLogin("inactive");
                  this.toastr.error(loginReturn.errorMessage, "Could not log in!");
                }
              });

            this.storage.set("authState", resolve);
            setTimeout(() => {
              this.router.navigate(["showroom"]);
            }, 3000);
          } else {
            this.toastr.error(resolve.message, "Login Error");
          }
        })
        .catch(error => (this.errorMsg = error.message));
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
