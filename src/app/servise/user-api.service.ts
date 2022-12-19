import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DBURL } from './_database/db';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private apiURL = DBURL;
  constructor(private _http: HttpClient) {}
  userArray: any = [
    {
      id: 1,
      name: 'rushanth',
      Image: 'https://i.ytimg.com/vi/Rk3T__b2mDg/maxresdefault.jpg',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 2,
      name: 'Janu',
      Image: 'image url',
      email: 'sample2@gmail.com',
      points: 1212,
    },
    {
      id: 3,
      name: 'stelin',
      Image: 'image url',
      email: 'sample3@gmail.com',
      points: 1212,
    },
    {
      id: 4,
      name: 'Shan',
      Image: 'image url',
      email: 'sample4@gmail.com',
      points: 1212,
    },
    {
      id: 5,
      name: 'rushanth',
      Image: 'image url',
      email: 'sample5@gmail.com',
      points: 1212,
    },
    {
      id: 6,
      name: 'Janu',
      Image: 'image url',
      email: 'sample6@gmail.com',
      points: 1212,
    },
    {
      id: 7,
      name: 'stelin',
      Image: 'image url',
      email: 'sample7@gmail.com',
      points: 1212,
    },
    {
      id: 8,
      name: 'Shan',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 9,
      name: 'stelin',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 10,
      name: 'Shan',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
  ];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllData(url: String, header: any): Observable<any> {
    return this._http.get(this.apiURL + url, header);
  }

  postValue(url: String, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    // console.log(this._http.put(this.apiURL + url, data, { headers: headers }));
    return this._http.post(this.apiURL + url, data, { headers: headers });
  }
}
type MyArrayType = Array<{
  id: number;
  name: string;
  Image: string;
  BIO: string;
  points: number;
}>;
