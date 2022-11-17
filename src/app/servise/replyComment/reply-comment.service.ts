import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBURL } from '../_database/db';

@Injectable({
  providedIn: 'root',
})
export class ReplyCommentService {
  private apiURL = DBURL;

  constructor(private _http: HttpClient) {}

  getAllData(url: String): Observable<any> {
    return this._http.get(this.apiURL + url);
  }
  handleDelete(url: String): Observable<any> {
    return this._http.delete(this.apiURL + url);
  }
}
