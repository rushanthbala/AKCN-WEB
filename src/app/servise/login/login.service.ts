import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DBURL } from '../_database/db';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiURL = DBURL;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private _http: HttpClient) {}

  postValue(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // console.log(this._http.put(this.apiURL + url, data, { headers: headers }));
    return this._http.post(this.apiURL + url, data, { headers: headers });
  }
}
