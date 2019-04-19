import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { SearchService } from '../services/search/search.service';
import { LoginService } from '../services/login.service';
import { WebSocketService } from '../services/web-socket.service';
import { ApiMethodsService } from '../services/api-methods.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { AuthService } from '../services/auth.service';
import { ShowroomService } from '../services/showroom/showroom.service';

@Component({
  selector: 'app-affordability',
  templateUrl: './affordability.component.html',
  styleUrls: ['./affordability.component.css']
})

export class AffordabilityComponent implements OnInit, OnDestroy {

  // API Hostname
  readonly apiHost = 'https://api.carloyi.com/index.php';
  readonly local = 'http://localhost:8000';
  readonly imagepath = 'https://carloyi.com/car_images/live/';
  model: any;

  // Set HTTP Headers
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Selected Model
  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));
  carInformation = this.searchedCarResults[0];
  showroom = false;
  loggedIn = false;
  userDataInfo: any;
  errorMsg: any;


  constructor(
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    public search: SearchService,
    public login: LoginService,
    public wsService: WebSocketService,
    private apiCall: ApiMethodsService,
    private toastr: ToastrService,
    private authService: AuthService,
    public dialog: MatDialog,
    private showroomService: ShowroomService
  ) {
  }

  /**
   * on page load
   */
  ngOnInit() {
    $('body').addClass('df');

    this.login.userLoginSubject
      .subscribe((data: any) => {
        if (data.status === 'active') {
          this.loggedIn = true;
          this.userDataInfo = data.data;
        }
      });

    const userData = this.storage.get('userInformation');
    if (userData === null) {
      this.loggedIn = false;
    } else {
      this.userDataInfo = userData.userData;
      this.loggedIn = true;
    }
    if (this.searchedCarResults === null) {
    } else {
      window.scrollTo(0, 0);
    }
  }

  ngOnDestroy() {

  }

  /**
   * Fetch Car Information
   * @param id
   * @returns { Subscription }
   */
  public fetchCarInfo(id: string) {
    this.apiCall.getFullCarInformation(id).subscribe((fullCarInformation: any) => {
      this.carInformation = fullCarInformation.carInformation[0];
    });
  }

  /**
   *
   * @param userEmail
   * @param userPassword
   */
  public userSignIn(userEmail: any, userPassword: any) {

    const email = userEmail.value;
    const password = userPassword.value;

    return this.authService.login(email, password).then(resolve => {

        if (typeof(resolve.user) !== 'undefined') {
          this.apiCall.login(email, password).subscribe((loginReturn: any) => {
            if (loginReturn.successCode === 201) {
              this.toastr.success('Login Successful', 'Great', {
                    timeOut: 10000,
                    extendedTimeOut: 3000,
                    easing: 'ease-in',
                    easeTime: 800,
                    progressAnimation: 'decreasing',
                    toastClass: 'toast',
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    tapToDismiss: true
                  });
              const loginInformation = {
                status: 'active',
                data: loginReturn.userData
              };
              this.wsService.getNotifications(loginReturn.userData.id);
              this.storage.set('userInformation', loginReturn);
              this.login.watchLogin(loginInformation);
              this.loggedIn = true;
              $('#login').modal('hide');
            } else {
              this.login.watchLogin('inactive');
              this.toastr.error(loginReturn.errorMessage, 'Could not sign in!');
            }
          });
        } else {
          this.toastr.error(resolve.message, 'Login Error');
        }
      }).catch(error => this.errorMsg = error.message);
  }

  /**
   *
   * @param emailRegister
   * @param nameRegister
   * @param lastNameRegister
   * @param phoneRegister
   * @param passwordRegister
   * @returns {Subscription}
   */
  public postUserProfile(emailRegister: any, nameRegister: any, lastNameRegister: any, phoneRegister: any, passwordRegister: any) {
    const registrationData = {
      email: emailRegister.value,
      name: nameRegister.value,
      lastName: lastNameRegister.value,
      password: passwordRegister.value,
      phone: phoneRegister.value
    };

    /**
     * Save to Firebase Realtime Database
     */
    this.authService.signUp(
      registrationData.email,
      registrationData.password,
      registrationData.name)
      .then(resolve => {

        return this.apiCall.register(registrationData).subscribe((data: any) => {
          if (data.successCode === 209) {

            this.toastr.success('Registration Successful', 'Congratulations!');
            this.userDataInfo = data.data;
            this.storage.set('authState', resolve);
            this.storage.set('userInformation', data);
            this.loggedIn = true;
            $('.registration').modal('hide');
            $('.login').modal('hide');
            this.login.watchLogin(data);

          } else {
            this.toastr.error(data.errorMessage, 'Sorry');
          }
      });

    }).catch(error => {
      this.errorMsg = error.message;
      this.toastr.error(this.errorMsg, 'Error!');
    });
  }

  /**
   * Get car id and save into showroom
   * @param carID
   * @returns {Subscription}
   */
  public getSuggestionID(carID: any) {
    return this.saveCarIntoShowroom(carID);
  }

  /**
   * Save Car Into Showroom
   * @param carID
   * @returns {Subscription}
   */
  private saveCarIntoShowroom(carID) {

    const userUID_CID = {
      uid: this.userDataInfo.id,
      cid: carID
    };

    this.showroomService.saveCarsIntoShowroom(userUID_CID).subscribe((response: any) => {
      if (response.code === 1) {
        this.toastr.success(
          'Car successfully saved (Check Your Showroom)',
          'Congratulations!');
        this.showroom = true;
      } else {
        this.toastr.success(
          'Car was not saved: ' + response.error,
          'Error/Warning!');
        this.showroom = false;
      }
    });
  }

  // Save user car into showroom
  public saveIntoShowroom(carID) {
    if (this.userDataInfo != null) {
      const userUID_CID = { uid: this.userDataInfo.id, cid: carID };
      return this.http.post(this.apiHost + '/api/showroom/add', userUID_CID, this.httpOptions)
        .subscribe((added: any) => {
            this.toastr.success('Car added to your wishlist', 'Awesome');
            setInterval(() => {
              location.reload();
              this.router.navigate(['showroom']);
            }, 3000);
          }
        );
    } else {
      this.toastr.info('Awesome', 'Please register/login to proceed. Please Wait...');
      setInterval(() => {
        this.router.navigateByUrl('/register');
      }, 3000);
    }
  }

  // Navigate to showroom
  public moveToShowroom() {
    $('#carInformation').modal('hide');
    $('.modal-backdrop').hide();
    this.router.navigate(['showroom']);
  }

  // Redirect
  public redirect(page) {
    this.router.navigate([page]);
  }
}
