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
import { Router } from '@angular/router';

@Component({
  selector: 'app-due-report',
  templateUrl: './due-report.component.html',
  styleUrls: ['./due-report.component.scss'],
})
export class DueReportComponent implements AfterViewInit, OnInit {
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
    'status',
    'dueAmount',
  ];
  ifGetData: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  ngOnInit(): void {}

  searching(first: Object | any) {
    var branchID = first.user.branchID == 0 ? 'All' : first.user.branchID;
    var areaID = first.user.AreaID == 0 ? 'All' : first.user.AreaID;
    var roadID = first.user.RoadID == 0 ? 'All' : first.user.RoadID;
    var statusID = first.user.StatusName == 0 ? 'All' : first.user.StatusName;
    var minAmount = first.minAmount == 0 ? 'All' : first.minAmount;
    this.dataServise
      .getData(
        `connectionReport/branchAreaRoadDueStatus/${branchID}/${areaID}/${roadID}/${minAmount}/${statusID}`
      )
      .subscribe(
        (res) => {
          this.userData = res;
          this.tableResult = this.userData.length;

          this.dataSource = new MatTableDataSource(this.userData);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 1);
          this.ifGetData = true;
          this.isFetchDataFail = false;
        },
        (err) => {
          this.ifGetData = true;
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
  viewDetails(id: any) {
    this.router.navigate([`auth/alter-connection/history/${id.id}`]);
  }
}
