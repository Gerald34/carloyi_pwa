import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../services/chat.service';
import { ShowroomService } from "../services/showroom/showroom.service";

@Component({
  selector: 'app-client-offers',
  templateUrl: './client-offers.component.html',
  styleUrls: ['./client-offers.component.css'],
})

export class ClientOffersComponent implements OnInit {
  // API Location
  readonly imagepath = "https://images.carloyi.com/";
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
  // Booking Properties
  model: any;
  time: any;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public login: LoginService,
    private toastr: ToastrService,
    private chat: ChatService,
    private showroomService: ShowroomService
  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);

    this.login.userLoginSubject
      .subscribe((data: any) => {
        if (data.status === 'active') {
          this.userDataInfo = data.data;
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
    this.showroomService.getUserOffers(this.userInformation.uid).subscribe((offers: any) => {
        if (offers.errorCode === 311) {
            this.errorMessages = offers;
        } else {
            this.cars = offers.offers.cars;
            this.offerEntries = offers.offers;
        }
    });
    return false;
  }

  /**
   * Confirm user interest in an offer
   * @url /api/showroom/interested/itemID
   * @param itemID
   * @returns {Subscription}
   */
  public interested(itemID) {
    return this.showroomService.sendInterest(itemID).subscribe((interested: any) => {
      if (interested.successCode === 400) {
        // Create realtime chat with dealer via Firebase
        this.chat.createChat(interested);
        // Response Notifiers
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
        // Refresh Offers Component
        this.getOffers();
      } else {
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
    return this.showroomService.rejectOffer(itemID).subscribe((rejected: any) => {
      if (rejected.successCode === 800) {
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

}
