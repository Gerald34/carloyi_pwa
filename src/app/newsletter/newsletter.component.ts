import { Component, OnInit } from '@angular/core';
import { ApiMethodsService } from '../services/api-methods.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  constructor(
    private apiMethods: ApiMethodsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  /**
   * Newsletter sign up
   * @param {string} nameNewsletter
   * @param {string} emailNewsletter
   * @returns {Subscription}
   */
  public newsletterSignUp(nameNewsletter: string, emailNewsletter: string) {
    const info = {
      name: nameNewsletter,
      email: emailNewsletter
    };

    return this.apiMethods.newsletter(info).subscribe((data: any) => {
      if (data.errorCode > 0) {
        this.toastr.success(data.errorMessage, 'Newsletter');
        $('#email').val('');
      } else if (data.successCode > 0) {
        this.toastr.success(data.successMessage, 'Newsletter');
        $('#email').val('');
        $('#name').val('');
      } else {
        this.toastr.success(data.errorMessage, 'Newsletter');
      }
    });
  }

}
