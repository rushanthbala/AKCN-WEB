import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../servise/user-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { DBURL } from 'src/app/servise/_database/db';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public baseurl: String = DBURL;
  userData: any;
  p: number = 1;
  constructor(public dataServise: UserApiService) {}
  // p: number = 1;

  ngOnInit(): void {
    // getting real API
    this.getAllData();
  }
  getAllData() {
    this.dataServise.getAllData('ji').subscribe((res) => {
      console.log(res, 'response');
      this.userData = res;
      console.log(this.userData, '-userdara');
    });
  }
  handleDelete(id: any) {
    console.log(id, '=====');
  }
}
