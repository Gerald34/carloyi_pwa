import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MetatagsService {

  constructor(private http: HttpClient) { }

  getMetaData(articleSlug) {
    return this.http.get('http://localhost:8000/api/metadata/' + articleSlug);
  }
}
