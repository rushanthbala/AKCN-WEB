import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DBURL } from '../_database/db';

@Injectable({
  providedIn: 'root',
})

export class SettingService {
  private apiURL = DBURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private _http: HttpClient) {}

  getAllData(url: String): Observable<any> {
    return this._http.get(this.apiURL + url);
  }
  postValue(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this._http.put(this.apiURL + url, data, { headers: headers });
  }
}
