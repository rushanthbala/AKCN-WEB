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
    'invoiceID',
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
    'invoiceID',
    'enteredBy',
    'conductedBy',
    'paymentType',
    'description',
    'amount',
  ];
  paymentType: any;
  showTable1: any;
  EmployeeData: any;

  constructor(public dataServise: HttpService, private fb: FormBuilder) { }

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
      (respon) => {
        this.userData = respon[0];
        this.tableResult = this.userData.length;
        this.showTable = true;
        // console.log(respon);
        this.getPaymentHistory(id);
        this.getEmployee();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getPaymentHistory(id: any) {
    var withArrear = []
    console.log('okokok');
    this.dataServise.getData(`payment/connectionid/${id}`).subscribe(
      (res) => {
        let reverse = res.reverse()
        let array = reverse;
        array.map((item: any) => {
          if (
            item.paymentType == "FINE" ||
            item.paymentType == "RECONNECT" ||
            item.paymentType == "CHANGE LOCATION" ||
            item.paymentType == "DISCONNECT" ||
            item.paymentType == "NEW CONNECTION"
          ) {
            this.ConnectionData.push(item);
          } else {
            console.log(item.paymentType);

            this.TICKET_DATA.push(item);
          }
        });
        console.log(this.TICKET_DATA, "TICKET_DATA");
        console.log(this.ConnectionData, "ConnectionData");

        // payment history arrear handling
        withArrear = this.TICKET_DATA
        var CalculateArrear: any;
        withArrear.map((it: any, i: any) => {
          if (it.amount) {
            if (i == 0) {
              CalculateArrear = Number(this.userData.dueAmount)
              it['CalculateArrear'] = CalculateArrear
            } else {
              // for payment column
              if (it.paymentType == "DISCOUNT" || it.paymentType == "MONTHLY PAYMENT") {
                CalculateArrear = Number(CalculateArrear) - Number(it.amount)
                it['CalculateArrear'] = ` ${Number(CalculateArrear)}`

              } else {
                // if()
                CalculateArrear = Number(Number(CalculateArrear) + Number(it.amount))
                it['CalculateArrear'] =` ${Number(CalculateArrear)} `
              }
            }
          }
        })

        this.dataSource = new MatTableDataSource(this.TICKET_DATA);
        this.dataSource1 = new MatTableDataSource(this.ConnectionData);
        this.showTable = true;
        this.showTable1 = true;


        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource1.paginator = this.paginator1;
          this.dataSource1.sort = this.sort1;
        }, 1);
        this.ifGetData = true;

      },
      (err) => {
        this.ifGetData = true;
      }
    );
    this.showTable = true;


    // withArrear = this.TICKET_DATA
    // var CalculateArrear: any;
    // withArrear.map((it: any, i: any) => {
    //   if (it.amount) {
    //     if (i == 0) {
    //       CalculateArrear = Number(this.userData.dueAmount)
    //       it['CalculateArrear'] = CalculateArrear
    //     } else {
    //       // for payment column
    //       if (it.paymentType == "DISCOUNT" || it.paymentType == "MONTHLY PAYMENT") {
    //         it['CalculateArrear'] = Number(CalculateArrear) - Number(it.amount)
    //         CalculateArrear = Number(CalculateArrear) - Number(it.amount)

    //       } else {
    //         // if()
    //         CalculateArrear = Number(CalculateArrear) - Number(it.amount)
    //         it['CalculateArrear'] = Number(CalculateArrear) - Number(it.amount)
    //       }
    //     }
    //   }
    // })
    // console.log(withArrear, "withArrear");
    // this.TICKET_DATA = withArrear;


  }

 

  getEmployee(){
    this.dataServise.getData(`employee`).subscribe(
      (res) => {
        let array = res;

        // array.map((item: any) => {
          // console.log(item.firstName)
          this.EmployeeData = res
        // })
        // console.log("1", res)
        this.ifGetData = true;
      },
      (err) => {
        this.ifGetData = true;
      }
    );
  }

  convertIdToName(name: any){
    let employeeName = ""
    this.EmployeeData.map((item: any) => {
      if(item.id == name){
        employeeName = item.firstName
      }else{
        employeeName = '--'
      }
    })
    console.log(employeeName)
    return employeeName
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
