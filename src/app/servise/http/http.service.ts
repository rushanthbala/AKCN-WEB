import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBURL } from '../_database/db';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiURL = DBURL;

  constructor(private _http: HttpClient) {}
  // get data from database
  getData(url: String): Observable<any> {
    return this._http.get(this.apiURL + url);
  }

  // delete
  DeleteData(url: String): Observable<any> {
    return this._http.delete(this.apiURL + url);
  }
  // post
  postValue(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this._http.post(this.apiURL + url, data, { headers: headers });
  }
  // put
  putValue(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this._http.put(this.apiURL + url, data, { headers: headers });
  }

}
