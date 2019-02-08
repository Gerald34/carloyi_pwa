import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {HeaderComponent} from '../header/header.component';

declare var $: any;
import {ClientProfileComponent} from '../client-profile/client-profile.component';
import {SearchService} from '../services/search.service';
import {LoginService} from '../services/login.service';
import {ClientOffersComponent} from '../client-offers/client-offers.component';
import {ToastrService} from 'ngx-toastr';
// Services
import {ApiMethodsService} from '../services/api-methods.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css'],
  providers: [ClientOffersComponent]
})

/**
 *
 */
export class ShowroomComponent implements OnInit {
  // API Location
  readonly apiDomain = 'https://api.carloyi.com/index.php';
  readonly local = 'http://localhost:8000';
  readonly imagepath = 'https://carloyi.com/car_images/live/';

  picker: string;
  date: string;

  // Set HTTP Headers
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true'
    })
  };

  // All Local Storage Data
  dataInfo = this.storage.get('userInformation');
  userData = this.dataInfo.userData;
  auth = this.storage.get('auth');
  userDataInfo = this.userData;
  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));

  // All API related properties
  allUserCars: any;
  addedCars: any;
  apiReturn: any;
  offers: any;
  cars: any;
  carType: any;

  status: any;
  headerFunc: any;
  profileMethods: any;
  nations: any;
  page: any;

  // Offer Properties
  itemID_1: any;
  uid_1: any;
  user_email_1: any;
  name: string;
  surname: string;
  dealerOffer: any;

  // Booking Properties
  itemID: number;
  offerInformation: any;
  offerDataSuccess = false;
  empty: boolean;

  agreement: any;
  gender: string = this.userData.gender;
  response: any;
  data: any;
  updateData: any;
  nationality: string = this.userData.nationality;
  nationalityObject = false;
  genderObject = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private toastr: ToastrService,
    private header: HeaderComponent,
    private profile: ClientProfileComponent,
    public login: LoginService,
    public apiMethods: ApiMethodsService,
    private searchService: SearchService // public ClientOffers: ClientOffersComponent
  ) {
  }

  /**
   *
   */
  ngOnInit() {
    this.empty = false;
    this.login.itemIdSubject.subscribe((itemID: number) => {
      this.getOfferDetails(itemID);
      this.itemID = itemID;
    });

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

    window.scrollTo(0, 0);

    this.name =
      this.userDataInfo.name[0].toUpperCase() +
      this.userDataInfo.name.substr(1);
    this.surname =
      this.userDataInfo.lastName[0].toUpperCase() +
      this.userDataInfo.lastName.substr(1);
    const userID = this.userDataInfo.id;
    this.showroomInformation(userID);
    this.getNationality();
    this.headerFunc = this.header;
    this.profileMethods = this.profile;
  }

  highlightTab(event) {
    const targetID = event.target.id;
    console.log(targetID);
    $('a.icon').removeClass('activeTab');
    $('#' + targetID).addClass('activeTab');
  }

  getOfferDetails(itemID) {
    this.apiMethods.offerDetails(itemID).subscribe((data: any) => {
      this.offerInformation = data;
      this.offerDataSuccess = true;
    });
  }

  /**
   *
   */
  public logout() {
    this.storage.remove('userInformation');
    this.userDataInfo = null;
    const logout = {
      status: 'inactive',
      data: null
    };
    this.login.watchLogin(logout);
    this.router.navigate(['signin']);
  }

  /**
   * Get all cars
   * @url /api/allCars
   * @param {string} type
   * @returns {Subscription}
   */
  public suitabilitySearch() {
    return this.apiMethods.suitabilitySearch().subscribe((data: any) => {
      this.searchService.setStorageItem('searchedCarResults', {
        results: data,
        type: 'suitabilitySearch'
      });
      this.storage.set('car_type', {
        data: data,
        type: 'suitabilitySearch',
        title: 'Search cars'
      });
      this.searchService.storeSearchData(data);
      this.router.navigate(['results']);
    });
  }

  /**
   * Get Nations
   * @returns {Subscription}
   */
  public getNationality() {
    return this.http
      .get('https://restcountries.eu/rest/v2/all')
      .subscribe(nations => {
        this.nations = nations;
      });
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
    return this.http
      .get(this.apiDomain + '/api/showroom/cars/' + userInformation.uid)
      .subscribe((data: any) => {
        this.apiReturn = data;
        if (data.code === -1) {
          this.empty = true;
          // swal('Showroom Empty ', data.error, 'warning');
        } else {
          this.empty = false;
          this.allUserCars = data[0].data.cars.data;
          this.page = 1;
          $(function () {
            if (data[0].code === 1) {
              $('.footer').css('position', 'relative');
            } else {
              $('.footer').css('position', 'absolute');
            }
          });
        }
      });
  }

  /**
   * Send Request
   * @param requestID
   * @param userID
   * @param userEmail
   * @param extras
   * @returns {Subscription}
   */
  public sendRequest(requestID: any, userID, userEmail, extras) {
    const requestData = {
      cid: requestID,
      uid: userID,
      email: userEmail,
      extras: extras
    };

    if (this.userDataInfo.status === 1) {
      return this.apiMethods.placeRequest(requestData).subscribe((data: any) => {
        console.log(data);
        if (data.successCode === 200) {
          swal('Great!!', 'Request was successfully sent', 'success');
        } else if (data.code === -1) {
          swal('Oops!', data.error, 'info');
        } else {
          swal('Oops!', data.errorMessage, 'info');
        }
      });
    } else {
      swal(
        'Attention',
        'Please provide us with important information before we proceed',
        'info'
      );
    }
  }

  /**
   * Get Nationality Value
   * @param event
   */
  onNationalityChange(event) {
    this.nationality = event.target.value;
  }

  /**
   * Get Gender Value
   * @param event
   */
  onGenderChange(event) {
    this.gender = event.target.value;
  }

  /**
   * Collect User data then parse the object to update method
   * @method _updateProfile()
   * @param {string} email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} contactNumber
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

    if (this.agreement === 'on') {
      return this._updateProfile(updateProfileData);
    } else {
      swal('Notice!', 'Please consent to the terms of use', 'warning');
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

    return this.apiMethods.updateUserInformation(updateProfileData).subscribe((data: any) => {
      if (typeof data.successCode !== 'undefined') {

        // Update current user data
        this.userDataInfo = data.userData;
        this.storage.set('userInformation', data);
        $('.profile').modal('hide');
        this.login.watchLogin(data);
        this.toastr.success(data.successMessage, 'Great!');

      } else {
        this.response = this.updateData.errorMessage;
        swal('Sorry', this.response, 'warning');
      }
    });
  }

  public goToProfile() {
    (<any>$('.nav-tabs a[href="#my_profile"]')).tab('show');
  }

  toggleEditable(event) {
    if (event.target.checked) {
      this.agreement = 'on';
    }
  }

  /**
   * Get Offer Data
   * @param itemID
   * @param uid
   * @param user_email
   */
  getOfferData(itemID, uid, user_email) {
    this.itemID_1 = itemID;
    this.uid_1 = uid;
    this.user_email_1 = user_email;
  }

  /**
   * Send Request
   * @param itemID
   * @param uid
   * @returns {Subscription}
   */
  // public sendRequest(requestID, userID, userEmail, extras) {
  //
  //   const requestData = {
  //     cid: requestID,
  //     uid: userID,
  //     email: userEmail,
  //     extras: extras
  //   };
  //
  //   if (this.userDataInfo.status === 1) {
  //
  //     this.apiMethods.placeRequest(requestData).subscribe( (data: any) => {
  //
  //       if (data.successCode === 200) {
  //         swal('Great!!', 'Request was successfully sent', 'success');
  //       } else if (data.code === -1) {
  //         swal('Oops!', data.error, 'info');
  //       } else {
  //         swal('Oops!', data.errorMessage, 'info');
  //       }
  //
  //     });
  //
  //   } else {
  //
  //     swal('Attention', 'Please provide us with important information before we proceed', 'info');
  //
  //   }
  //
  // }
}
