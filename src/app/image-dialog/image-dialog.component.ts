import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {stringify} from 'querystring';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  image_file: any;

  constructor(public dataShare: LoginService) { }

  ngOnInit() {
    this.dataShare.imageUrlSubject.subscribe((data: string) => {
      this.useImage(data);
    });
  }

  public useImage(data) {
    this.image_file = data.url;
  }

}
