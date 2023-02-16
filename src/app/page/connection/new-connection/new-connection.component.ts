import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { NoDataComponent } from 'src/app/core/dialogBox/pending/no-data/no-data.component';
import { SharedService } from 'src/app/servise/shared/shared.service';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.scss'],
})
export class NewConnectionComponent {
  animal: string | any;
  name: string | any;
  isActiveAddConnectionCom: boolean = false;
  addSubscriberIf: boolean = false;
  userData: any = {};
  // after posting
  loading: boolean = true;
  isNotUserData: boolean = false;
  errmsg: string = '';
  sucmsg: string = '';
  suburl: string = 'connection';
  // table variable
  showTable: boolean = false;
  subscriberdata: any = {};
  isSubscriberdata: boolean = false;
  tableResult: any;
  searchtext: any;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private shared: SharedService
  ) {}
  searching(first: Object | any) {
    var cInput: String = first.searchinginput;
    this.searchtext = cInput;
    this.shared.setMessage(cInput);
    this.dataServise.getData(`connection/nic/${cInput}`).subscribe(
      (res) => {
        let result = res.length;
        this.userData = res[0];
        this.tableResult = this.userData.length;
        this.isNotUserData = false;
        this.showTable = true;
      },
      (err) => {
        this.isNotUserData = true;
        this.addSubscriberIf = true;
      }
    );
  }
  afterSubCreated() {
    this.dataServise.getData(`connection/nic/${this.searchtext}`).subscribe(
      (res) => {
        let result = res.length;
        this.userData = res[0];
        this.tableResult = this.userData.length;
        this.isNotUserData = false;
        this.showTable = true;
      },
      (err) => {
        this.isNotUserData = true;
        this.addSubscriberIf = true;
      }
    );
  }

  NoDataDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(NoDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  addAnotherConnection() {
    this.isActiveAddConnectionCom = true;
  }
}
