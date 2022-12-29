import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servise/http/http.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  loginForm: any;
  inputset: any;
  Change: any;
  Extra: any;
  Reconnection: any;
  object: any;
  userData: any = [];
  ifGetData: boolean = false;

  TICKET_DATA: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'paidDateTime',
    'conductedBy',
    'description',
    'RENTAL',
    'amount',
    'due',
    // 'enteredBy',
    // 'paymentType',
  ];
  ifGetdata1: boolean = false;
  private _liveAnnouncer: any;
  showTable: any;
  tableResult: any;
  ConnectionData: any = [];
  dataSource1: any;
  displayedColumns1: string[] = [
    'paidDateTime',
    'enteredBy',
    'conductedBy',
    'paymentType',
    'description',
    'amount',
  ];
  paymentType: any;

  constructor(public dataServise: HttpService, private fb: FormBuilder) {}

  @ViewChild('sort') sort: MatSort | any;
  @ViewChild('paginator') paginator: MatPaginator | any;

  @ViewChild('sort1') sort1: MatSort | any;
  @ViewChild('paginator1') paginator1: MatPaginator | any;

  ngOnInit(): void {
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    // this.openReconnectBigDialog()
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
    this.getAllDetails(id);
    this.getPaymentHistory(id);
    // this.getConnectionHistory(id);
  }
  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialInputForm() {
    this.inputset = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialChangeForm() {
    this.Change = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialExtraForm() {
    this.Extra = this.fb.group({
      numberOfTV: '',
      phoneNumber: '',
    });
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      phoneNumber: '',
      address: '',
      area: '',
      road: '',
    });
  }

  getAllDetails(id: any) {
    // var connectionId = first.connectionid.id;
    // console.log(connectionId)
    console.log('1', id);
    this.dataServise.getData(`connection/id/${id}`).subscribe(
      (res) => {
        this.userData = res[0];
        this.tableResult = this.userData.length;
        this.showTable = true;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPaymentHistory(id: any) {
    console.log('okokok');
    this.dataServise.getData(`payment/connectionid/${id}`).subscribe(
      (res) => {
        let array = [res];
        // console.log("2", array)

        // var ConnectionData = [];
        // var TICKET_DATA = [];

        array.map((item) => {
          if (
            item.paymentType == "FINE" ||
            item.paymentType == "RECONNECT" ||
            item.paymentType == "CHANGE LOCATION" ||
            item.paymentType == "DISCONNECT" ||
            item.paymentType == "NEW CONNECTION"
          ) {
            // console.log('works')
            this.ConnectionData = res;
            this.dataSource1 = new MatTableDataSource(this.ConnectionData);
            this.showTable = true;
            setTimeout(() => {
              this.dataSource1.paginator = this.paginator1;
              this.dataSource1.sort = this.sort1;
            }, 1);
          } else {
            // console.log('woooss')
            this.TICKET_DATA = res;
            this.dataSource = new MatTableDataSource(this.TICKET_DATA);
            this.showTable = true;
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 1);
            this.ifGetData = true;
          }
        });

        // this.ConnectionData = res;
        // this.dataSource1 = new MatTableDataSource(this.ConnectionData);
        // this.showTable = true;
        // setTimeout(() => {
        //   this.dataSource1.paginator = this.paginator1;
        //   this.dataSource1.sort = this.sort1;
        // }, 1);

        // this.TICKET_DATA = res;
        // this.dataSource = new MatTableDataSource(this.TICKET_DATA);
        // this.showTable = true;
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        // }, 1);
        // this.ifGetData = true;
      },
      (err) => {
        this.ifGetData = true;
      }
    );
  }

  // getConnectionHistory(id: any) {
  //   console.log('okokok');
  //   this.dataServise.getData(`payment/connectionid/${id}`).subscribe(
  //     (res) => {
  //       this.ConnectionData = res;
  //       this.dataSource1 = new MatTableDataSource(this.ConnectionData);
  //       this.showTable = true;
  //       setTimeout(() => {
  //         this.dataSource1.paginator = this.paginator1;
  //         this.dataSource1.sort = this.sort1;
  //       }, 1);
  //       this.ifGetData = true;
  //     },
  //     (err) => {
  //       this.ifGetData = true;
  //     }
  //   );
  // }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.TICKET_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.dataSource1 = new MatTableDataSource(this.ConnectionData);
    // this.dataSource1.paginator1 = this.paginator1;
    // this.dataSource1.sort1 = this.sort1;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
