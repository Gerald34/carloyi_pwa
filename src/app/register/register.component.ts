import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { NavigationEnd, Router } from '@angular/router';
import { ApiMethodsService } from '../services/api-methods.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

// Animations Modules
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  readonly registerUserEndpoint = 'https://api.carloyi.com';
  readonly local = 'http://localhost:8000';
  errorMsg: string;

  // Set HTTP Headers
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  carID = JSON.parse(localStorage.getItem('cid'));
  randomCars: any;
  imagepath = "https://images.carloyi.com/";

  /**
   * Constructor
   * @param {HttpClient} httpClient
   * @param {Router} router
   * @param {ApiMethodsService} ApiMethods
   * @param {AuthService} authService
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ApiMethods: ApiMethodsService,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  public fetchRandomCars() {
    this.ApiMethods.randomCars().subscribe((data: any) => {
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

    return this.authService.signUp(regData.email, regData.password, regData.name)
      .then(resolve => {

        if (typeof(resolve.code) === 'undefined') {

          /**
           * Push to api methods service
           */
          this.ApiMethods.register(regData).subscribe((response: any) => {
            // Check request response
            if (response.successCode === 209) {
              this.authService.setUserID(response.userData.id);
              this.storage.set('userInformation', response);
              this.storage.set('auth', resolve);
              this.toastr.success(response.successMessage, 'Congratulations');
              this.router.navigate(['showroom']);
            } else {
              swal('Sorry', response.errorMessage, 'error');
            }
          });

        } else {

          this.toastr.error(resolve.message, 'Registration Error');
          swal('Sorry', resolve.message, 'error');
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
