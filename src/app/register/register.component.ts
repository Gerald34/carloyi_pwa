import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../services/general/general.service';
import { PushNotificationsService } from '../services/push-notifications/push-notifications.service';
import { UriService } from '../services/uri/uri.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: string;

  carID = JSON.parse(localStorage.getItem('cid'));
  randomCars: any;
  imagepath = this.uri.imagePath;

  constructor(
    private router: Router,
    private uri: UriService,
    private generalService: GeneralService,
    private authService: AuthService,
    private toastr: ToastrService,
    private pushNotificationsService: PushNotificationsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  public fetchRandomCars() {
    this.generalService.randomCars().subscribe((data: any) => {
      this.randomCars = data;
    });
  }

  /**
   * User Registration
   * @param emailRegister
   * @param nameRegister
   * @param lastNameRegister
   * @param phoneRegister
   * @param passwordRegister
   * @returns {Subscription}
   */
  postUserProfile(
    emailRegister, // user email
    nameRegister, // username
    lastNameRegister, // user lastName
    phoneRegister, // user phone number
    passwordRegister // user password
  ) {
    const regData = {
      email: emailRegister,
      name: nameRegister,
      lastName: lastNameRegister,
      phone: phoneRegister,
      password: passwordRegister
    };

    return this.authService.signUp(regData.email, regData.password, regData.name).then(resolve => {

        if (typeof(resolve.code) === 'undefined') {
          // Push to api methods service
          this.generalService.register(regData).subscribe((response: any) => {
            // Check request response
            if (response.successCode === 209) {
              this.pushNotificationsService.notifyUser(response.userData.id);
              this.authService.setUserID(response.userData.id);
              this.storage.set('userInformation', response);
              this.storage.set('auth', resolve);
              this.toastr.success(response.successMessage, 'Welcome');
              this.router.navigate(['showroom']);
            } else {
              this.toastr.error(response.errorMessage, 'Sign In');
            }
          });
        } else {
          this.toastr.error(resolve.message, 'Registration Error');
        }
      }).catch(error => {
        this.errorMsg = error.message;
        this.toastr.error(this.errorMsg, 'Registration Error');
      });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.fetchRandomCars();
  }

}
