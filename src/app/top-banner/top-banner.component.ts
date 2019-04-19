import { Component, OnInit } from "@angular/core";
import "hammerjs";

@Component({
  selector: "app-top-banner",
  templateUrl: "./top-banner.component.html",
  styleUrls: ["./top-banner.component.css"]
})
export class TopBannerComponent implements OnInit {
  sliderData = [
    {
      image: "../../assets/images/slider_1.jpg",
      title: "Buy smart",
      caption:
          "It took me 3 days to get offers, test drive and then buy my new car through Carloyi – ended up saving R60 000 on the market price",
      buttonText: "help me find a car",
      link: "/apps"
    },
    {
      image: "../../assets/images/slider_3.jpg",
      title: "Buy smart",
      caption:
          "I couldn’t believe it when I saw the offer come through on my Carloyi Dashboard. R100 000 off a brand new Jeep!",
      buttonText: "help me find a car",
      link: "/apps"
    },
    {
      image: "../../assets/images/slider_2.jpg",
      title: "Buy smart",
      caption:
          "Carloyi made buying a new car super easy. I liked that I could chat to dealers through the Carloyi chat room on my own terms. No pesky calls",
      buttonText: "help me find a car",
      link: "/apps"
    }
  ];

  constructor() {}
  ngOnInit() {}



  /**
   *
   */
  public moveDown() {
    $("html, body").animate(
      {
        scrollTop: $(".searchOptions").offset().top
      },
      1000
    );
  }
}
