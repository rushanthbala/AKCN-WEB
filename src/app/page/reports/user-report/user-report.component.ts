import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent {
  animal: string | any;
  name: string | any;
  showTable: boolean = false;
  tableResult: any;

  userData: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'ConnectionID',
    'ConnectionAddress',
    'ConnectionStatus',
    'ConnectionDate',
  ];
  ifGetData: boolean = false;
  isFetchDataFail: boolean = false;


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
    // var connectionId = first.connectionId
    // var amount = first.amount
    // var arreardate = first.arreardate
    // console.log(connectionId, amount, arreardate);

    var userName = first.user.id;
    var fromdate = first.fromdate;
    var todate = first.todate;

    // connectionId: connectionId, amount: amount,arreardate:arreardate
    // var Ctype: string = first.type
    // var url = findTypeUrl(Ctype)

    // var cInput: String = first.searchinginput
    this.dataServise
      .getData(`userReport/${userName}/${fromdate}/${todate}`)
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
    // this.connectionId = id.id;
  }
}
