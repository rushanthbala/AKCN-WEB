import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBURL } from '../_database/db';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}
  private apiURL = DBURL;

  getAllData(url: String): Observable<any> {
    return this._http.get(this.apiURL + url);
  }
}
