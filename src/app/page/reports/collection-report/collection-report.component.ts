import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss'],
})
export class CollectionReportComponent implements AfterViewInit, OnInit {
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
    'ConnectionStatus',
    'ConnectionDate',
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
    var fromdate = first.fromdate;
    let year1 = fromdate.getFullYear();
    let month1 = fromdate.getMonth() + 1;
    let day1 = fromdate.getDate();
    if (day1 < 10) {
      day1 = '0' + day1;
    }

    if (month1 < 10) {
      month1 = '0' + month1;
    }

    let fromdate1 = year1 + '-' + month1 + '-' + day1;

    var todate = first.todate;
    let year2 = todate.getFullYear();
    let month2 = todate.getMonth() + 1;
    let day2 = todate.getDate();
    if (day2 < 10) {
      day2 = '0' + day2;
    }

    if (month2 < 10) {
      month2 = '0' + month2;
    }

    let todate2 = year2 + '-' + month2 + '-' + day2;

    this.dataServise
      .getData(`connectionReport/byDate/${fromdate1}/${todate2}`)
      .subscribe(
        (res) => {
          this.userData = res;
          this.tableResult = this.userData.length;

          this.dataSource = new MatTableDataSource(this.userData);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 1);
          this.isFetchDataFail = false;
        },
        (err) => {
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
  NoDataDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(NoDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.animal = result;
    });
  }
  UpdatedateDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
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
