import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import { findTypeUrl } from 'src/app/servise/utils/function';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  loginForm: FormGroup | any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  // after posting
  loading: boolean = true;
  errmsg: string = '';
  sucmsg: string = '';
  suburl: string = 'connection';
  isFetchDataFail: boolean = false;
  // table variable
  showTable: boolean = false;
  subscriberdata: any = {};
  isSubscriberdata: boolean = false;
  tableResult: any;

  userData: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'primaryPhone',
    'connectionAddress',
    'connectionStatus',
    'tvCount',
    'connectionType',
  ];
  ifGetData: boolean = false;

  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngOnInit(): void {}
  searching(first: Object | any) {
    var Ctype: string = first.type;
    var url = findTypeUrl(Ctype);

    var cInput: String = first.searchinginput;
    this.dataServise.getData(`${this.suburl}/${url}/${cInput}`).subscribe(
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
  viewDetails(us: any) {
    this.showTable = false;
    this.subscriberdata = us;
    this.isSubscriberdata = true;
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
