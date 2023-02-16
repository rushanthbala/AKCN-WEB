import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpService } from 'src/app/servise/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from 'src/app/core/dialogBox/settings/role-dialog/role-dialog.component';
import { RolePermissionDialogComponent } from 'src/app/core/dialogBox/settings/role-permission-dialog/role-permission-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-setting',
  templateUrl: './role-settings.component.html',
  styleUrls: ['./role-settings.component.scss'],
})
export class RoleSettingComponent implements AfterViewInit, OnInit {
  TICKET_DATA: any = [];
  dataSource: any;
  displayedColumns: string[] = ['id', 'role', 'permission'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  userData: any;
  //
  loading: boolean = true;
  errmsg: string = '';
  sucmsg: string = '';
  suburl: string = 'connection';
  // table variable
  // change show table true
  showTable: boolean = true;
  subscriberdata: any = {};
  isSubscriberdata: boolean = false;
  ifGetData: boolean = false;
  sendtype: string = 'POST';
  tableResult: any;
  p: number = 1;
  submit: FormGroup | any;
  ngOnInit() {
    this.getPendingData();
    this.initialForm();
  }
  initialForm() {
    this.submit = this.fb.group({
      address: '',
    });
  }
  getPendingData() {
    this.dataServise.getData(`userrole`).subscribe(
      (res) => {
        this.TICKET_DATA = res;
        this.dataSource = new MatTableDataSource(this.TICKET_DATA);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1);

        this.ifGetData = true;
      },
      (err) => {
        this.ifGetData = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.TICKET_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  UpadteUserDialogBox(): void {
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '250px',
      data: { subscriberdata: this.subscriberdata, sendtype: this.sendtype },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
    });
  }

  UpadtePermissionDialogBox(): void {
    const dialogRef = this.dialog.open(RolePermissionDialogComponent, {
      width: '750px',
      data: { subscriberdata: this.subscriberdata, sendtype: this.sendtype },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  postData() {
    this.sendtype = 'POST';
    this.UpadteUserDialogBox();
  }
  viewDetails(us: any) {
    this.sendtype = 'PUT';
    this.subscriberdata = us;
    this.UpadteUserDialogBox();
  }
  viewPermission(us: any) {
    this.sendtype = 'PUT';
    this.subscriberdata = us;
    this.UpadtePermissionDialogBox();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface TicketElement {
  id: number;
  connectionID: number;
  ticketID: string;
  createdBy: string;
  assignedTo: string;
  assignedToID: string;
  updatedBy: string;
  subject: string;
  description: string;
  reason: string;
  phone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
}
