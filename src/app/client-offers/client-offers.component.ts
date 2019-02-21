import {Component, OnInit, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {LoginService} from '../services/login.service';
import {ApiMethodsService} from '../services/api-methods.service';
import {ToastrService} from 'ngx-toastr';
import {ChatService} from '../services/chat.service';

declare var $: any;
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

// export const DATEPICKER_VALUE_ACCESSOR =  {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => DatePickerComponent),
//   multi: true
// };

@Component({
  selector: 'app-client-offers',
  templateUrl: './client-offers.component.html',
  styleUrls: ['./client-offers.component.css'],
  // providers: [DATEPICKER_VALUE_ACCESSOR],
})

export class ClientOffersComponent implements OnInit {
  // API Location
  readonly apiDomain = 'https://api.carloyi.com/index.php';
  readonly local = 'http://localhost:8000';
  readonly imagepath = "https://images.carloyi.com/";


  // Set HTTP Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  selectedDate: any;
  disabled = false;

  // All Local Storage Data
  data = this.storage.get('userInformation');
  userDataInfo = this.data.userData;
  searchedCarResults = JSON.parse(this.storage.get('searchedCarResults'));

  // All API related properties
  userInformation: any;
  errorMessages: any;
  offers: any;
  offerEntries: any;
  cars: any;
  interestedReturn: any;

  // Booking Properties
  model: any;
  time: any;



  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public login: LoginService,
    private ApiMethods: ApiMethodsService,
    private toastr: ToastrService,
    private chat: ChatService
  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    this.login.userLoginSubject
      .subscribe((data: any) => {
        if (data.status === 'active') {
          this.userDataInfo = data.data;

        } else {

        }
      });
    this.getOffers();

  }

  /**
   *
   * @param itemID
   */
  public getOfferInformation(itemID) {
    this.login.getItemID(itemID);
  }

  /**
   * Get user offers
   * @url /api/showroom/offers/
   * @returns {boolean}
   */
  private getOffers() {

    this.userInformation = { uid: this.userDataInfo.id };

    this.http.get(this.apiDomain + '/api/showroom/offers/' + this.userInformation.uid)
      .subscribe((offers: any) => {

          if (offers.errorCode === 311) {
            this.errorMessages = offers;
          } else {
            this.cars = offers.offers.cars;
            this.offerEntries = offers.offers;
          }
        }
      );

    return false;
  }

  /**
   * Confirm user interest in an offer
   * @url /api/showroom/interested/itemID
   * @param itemID
   * @returns {Subscription}
   */
  public interested(itemID) {
    return this.ApiMethods.sendInterest(itemID)
      .subscribe((interested: any) => {

      if (interested.successCode === 400) {

        // Create realtime chat with dealer via Firebase
        this.chat.createChat(interested);

        // Response Notifiers
        // swal('Great', interested.successMessage, 'success');
        this.toastr.success(interested.successMessage,
          'Great!',
          {
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
            extendedTimeOut: 5000,
            tapToDismiss: true,
            closeButton: true,
            disableTimeOut: false
          });

        // this.chat.storeActivation(interested.dealerInformation);
        // Refresh Offers Component
        this.getOffers();

      } else {
        swal('Sorry', interested.errorMessage, 'error');
        this.toastr.error(interested.errorMessage,
          'Great!',
          {
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
            extendedTimeOut: 5000,
            tapToDismiss: true,
            closeButton: true,
            disableTimeOut: false
          });
      }
    });
  }

  /**
   * Decline and Delete Offer
   * @url /api/showroom/reject/itemID
   * @param itemID
   * @returns {Subscription}
   */
  public rejectOffer(itemID) {
    return this.ApiMethods.rejectOffer(itemID).subscribe((rejected: any) => {
      if (rejected.successCode === 800) {
        swal('Great', rejected.successMessage, 'success');
        this.toastr.warning(rejected.successMessage,
          'Great!',
          {
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
            extendedTimeOut: 5000,
            tapToDismiss: true,
            closeButton: true,
            disableTimeOut: false
          });
        this.getOffers();
      } else {
        this.toastr.error(rejected.errorMessage,
          'Great!',
          {
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
            extendedTimeOut: 5000,
            tapToDismiss: true,
            closeButton: true,
            disableTimeOut: false
          });
      }

    });
  }

  // Function to call when the date changes.
  // onChange = (date?: Date) => {};

  // Function to call when the date picker is touched
  // onTouched = () => {};



  // registerOnChange(fn: (date: Date) => void): void {
  //   this.onChange = fn;
  // }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  // registerOnTouched(fn: () => void): void {
  //   this.onTouched = fn;
  // }

  // Allows Angular to disable the input.
  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // Write change back to parent
  // onDateChange(value: Date) {
  //   this.onChange(value);
  // }

  // Write change back to parent
  // onDateSelect(value: any) {
  //   this.onChange(new Date(value.year, value.month - 1, value.day));
  // }

}
