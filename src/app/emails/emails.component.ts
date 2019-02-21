import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  readonly local = 'http://localhost:8000';
  readonly imagepath = "https://images.carloyi.com/";
  // Set HTTP Headers
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  userDataInfo: any = JSON.parse(this.storage.get('userDataInfo'));
  carInformation: any;

  constructor(
    private http: HttpClient,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  ngOnInit() {
    this.fetchCarInfo('2046');
  }

  public fetchCarInfo(carID: any) {
    return this.http.get(this.local + '/api/carsearch/getCarInfo/' + carID)
      .subscribe((carInfo: any) => {
        this.carInformation = carInfo.carInformation[0];
      });
  }

}
