import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoDataComponent } from 'src/app/core/dialogBox/pending/no-data/no-data.component';
import { UpdateDataComponent } from 'src/app/core/dialogBox/pending/update-data/update-data.component';
import { HttpService } from 'src/app/servise/http/http.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-unpaid-reports',
  templateUrl: './unpaid-reports.component.html',
  styleUrls: ['./unpaid-reports.component.scss'],
})
export class UnpaidReportsComponent implements AfterViewInit, OnInit {
  animal: string | any;
  name: string | any;
  showTable: boolean = false;
  tableResult: any;
  isFetchDataFail: boolean = false;
  subscriberdata: any;
  isSubscriberdata: boolean = false;

  userData: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'ConnectionID',
    'ConnectionAddress',
    'tvCount',
    'ConnectionDate',
    'dueAmount'
  ];
  ifGetData: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  ngOnInit(): void {}

  searching(first: Object | any) {

    //   {
    //     "branchID": 1,
    //     "RoadID": 0,
    //     "AreaID": 5
    // }

    var branchID = first.user.branchID == 0 ? 'All' : first.user.branchID;
    var RoadID = first.user.RoadID == 0 ? 'All' : first.user.RoadID;
    var AreaID = first.user.AreaID == 0 ? 'All' : first.user.AreaID;


    // var connectionId = first.connectionId
    // var amount = first.amount
    // var arreardate = first.arreardate
    // console.log(connectionId, amount, arreardate);

    // connectionId: connectionId, amount: amount,arreardate:arreardate
    // var Ctype: string = first.type
    // var url = findTypeUrl(Ctype)

    // var cInput: String = first.searchinginput
    this.dataServise
      .getData(`reportunpaid/${branchID}/${RoadID}/${AreaID}`)
      .subscribe(
        (res) => {
          this.userData = res;
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
  // UpdateDataComponent
  NoDataDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(NoDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  UpdatedateDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
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
