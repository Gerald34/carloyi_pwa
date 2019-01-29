import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from "rxjs/operators";
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  passwordToken: string;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const url = this.router.url;
    this.passwordToken = url.substring(10);
  }

  createNewPassword(newPassword: any, confirmPassword: any) {
    if (newPassword.value === confirmPassword.value) {

      return this.auth.updatePassword('glen@gmail.com', newPassword.value)
        .then((data: any) => {
        console.log(data);
      });

    } else {
      this.toastr.error('Passwords do not match', 'New Password Error');
    }
  }

}
