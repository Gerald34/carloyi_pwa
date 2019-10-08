import {Component, OnInit, Input} from '@angular/core';
declare var $: any;
import { ToastrService } from 'ngx-toastr';
// Services
import { ShowroomService } from '../services/showroom/showroom.service';

@Component({
  selector: 'app-book-a-test-drive',
  templateUrl: './book-a-test-drive.component.html',
  styleUrls: ['./book-a-test-drive.component.css'],
})
export class BookATestDriveComponent implements OnInit {

  @Input() offer;
  date: any;
  imagepath = "https://images.carloyi.com/";
  setTime: any;

  constructor(
    private showroomService: ShowroomService,
    private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    $('.bookTestDrive').modal('show');
  }

  getDate(date) {
  }

  /**
   *
   * @param itemID
   * @param date
   * @param time
   */
  public sendBooking(offer, date, setTime) {

    const booking = {
      booking_date: date.value,
      booking_time: setTime.timepickerInput._value,
      offer_id: offer.item.id,
      uid: offer.item.user_id,
      dealer_id: offer.item.dealer_id
    };

    return this.showroomService.bookTestDrive(booking).subscribe((data: any) => {

      if (data.warningCode === 204) {
        this.toastr.warning(data.warningMessage, 'Test Drive Booking: ' + offer.item.name, {
          positionClass: 'toast-bottom-right',
          tapToDismiss: true,
          closeButton: true,
          disableTimeOut: true
        });
      } else {
        $('.bookTestDrive').modal('hide');
        this.toastr.success(
          'Booking Reserved' +
          '<br>' +
          'Date: ' + data.data.bookingDate + '<br>' + 'Time: ' + data.data.time,
          'Test Drive Booking: ' + offer.item.name,
          {
            positionClass: 'toast-top-right',
            tapToDismiss: true,
            closeButton: true,
            disableTimeOut: true,
            enableHtml: true
          });

        // Send Booking Notification to dealer
        this.showroomService.bookingNotification(offer.item.dealer_id).subscribe((notification: any) => { return notification; });
      }

    });

  }

}
