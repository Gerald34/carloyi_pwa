import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#option-a-form').hide();
    $('#option-a').show();

    $('#option-1').on('click', function () {
      $('#option-a').hide();

      setTimeout(function () {
        $('#option-a-form ').show().addClass('animated fadeIn');
      }, 200);

      $('#cancel-a').on('click', function () {
        $('#option-a').show().addClass('animated fadeIn');
        $('#option-a-form ').hide();
      });

    });

    // Search car by make and model
    $('#option-b').show();
    $('#option-b-form ').hide();

    $('#option-2').on('click', function () {
      $('#option-b').hide();

      setTimeout(function () {
        $('#option-b-form').show().addClass('animated fadeIn');
      }, 200);

      $('#cancel-b').on('click', function () {
        $('#option-b').show().addClass('animated fadeIn');
        $('#option-b-form ').hide();
      });
    });
  }

}
