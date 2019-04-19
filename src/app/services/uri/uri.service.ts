import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UriService {
  // Server URL's
  readonly api = "https://api.carloyi.com/index.php";
  readonly nodeServer = "https://154.66.197.198:8080";
  readonly local = "http://localhost:8000";
  readonly imagePath = "https://images.carloyi.com/";
  readonly BlogImages = "https://posts.carloyi.com";
    // Set HTTP Headers
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };

  constructor() { }
}
