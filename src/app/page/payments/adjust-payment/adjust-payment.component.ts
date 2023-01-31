import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import { findTypeUrl } from 'src/app/servise/utils/function';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { AdjustPaymentUpdateComponent } from 'src/app/core/adjust-payment-update/adjust-payment-update.component';

@Component({
  selector: 'app-adjust-payment',
  templateUrl: './adjust-payment.component.html',
  styleUrls: ['./adjust-payment.component.scss']
})
export class AdjustPaymentComponent {
text: any;
  userData2: any;
  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  isFetchDataFail: boolean = false;
  loginForm: FormGroup | any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  // after posting
  loading: boolean = true;
  errmsg: string = '';
  sucmsg: string = '';
  suburl: string = 'connection';
  // table variable
  showTable: boolean = false;
  subscriberdata: any = {};
  isSubscriberdata: boolean = false;
  tableResult: any;
  sendtype: string = 'POST';
  userData: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'connectionID',
    'paymentType',
    'description',
    'amount',
    'createdDate'
  ];
  ifGetData: boolean = false;

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  UpadteUserDialogBox(): void {
    const dialogRef = this.dialog.open(AdjustPaymentUpdateComponent, {
      width: '250px',
      data: { subscriberdata: this.subscriberdata, sendtype: this.sendtype },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // this.animal = result;
      // this.getPendingData();
    });
  }

  searching(first: Object | any) {
    var cInput: String = first.searchinginput;
    this.dataServise.getData(`payment/invoice/${cInput}`).subscribe(
      (res) => {
        this.userData = res;
        // console.log(res.connectionID == '9');
        // if(res.connectionID){
        //   // console.log(res.connectionID)
        //   const id=res.connectionID.id
        //   console.log("3", id)
        //   this.dataServise.getData(`connection/id/${id}`).subscribe(
        //     (res) => {
        //       console.log(res)
        //       this.userData2 = res;
        //       this.tableResult = this.userData.length
        //       this.showTable = true;
        //     },
        //     (err)  =>{
        //       console.log(err)
        //     }
        //   )
        // }

        // let array = [res]
        // array.map((item) => {
        //  if(item.connectionID){
        //   console.log(item.connectionID)
        //   const id = item.connectionID.id
        //      this.dataServise.getData(`connection/id/${id}`).subscribe(
        //     (res) => {
        //       console.log(res)
        //       this.userData2 = res;
        //       this.tableResult = this.userData.length
        //       this.showTable = true;
        //     },
        //     (err)  =>{
        //       console.log(err)
        //     }
        //   )
        //  }
        // })

        this.tableResult = this.userData.length;

        this.dataSource = new MatTableDataSource(this.userData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1);
        // this.ifGetData = true;
        this.isFetchDataFail = false;
      },
      (err) => {
        // this.ifGetData = true;
        this.isFetchDataFail = true;
      }
    );
    this.showTable = true;
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.userData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  viewDetails(us: any) {
    // this.showTable = false;
    this.sendtype = 'PUT';
    this.subscriberdata = us;
    this.UpadteUserDialogBox();
    // this.isSubscriberdata=true;
    // console.log(us);
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
