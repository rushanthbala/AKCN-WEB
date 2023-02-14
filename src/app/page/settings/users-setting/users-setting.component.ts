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
// import { TableUtil } from './tableUtils';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpService } from 'src/app/servise/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { UserPostPut } from 'src/app/core/dialogBox/settings/user-dialog/user-dialog.component';
import { ThisReceiver } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-setting',
  templateUrl: './users-setting.component.html',
  styleUrls: ['./users-setting.component.scss'],
})
export class UsersSettingComponent implements AfterViewInit, OnInit {
  TICKET_DATA: any = [];
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'branchID',
    'roleID',
    'status',
    'createdDate',
  ];
  object: any;
  Result: any;
  Model: any;
  statusData: any;
  toggleValue: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dataServise: HttpService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userData: any;
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
  statusForm: FormGroup | any;
  public ifData: boolean = false;
  public currentData: any = {}
  ngOnInit() {
    this.getPendingData();
    this.getStatus();
    this.initialForm();
    this.secondForm();
  }
  initialForm() {
    this.submit = this.fb.group({
      address: ''
    });
  }
  secondForm(){
    this.statusForm = this.fb.group({
      checkbox:this.ifData ? this.statusData.checkbox: ' ',
    })
  }

  getStatus(){
    this.dataServise.getData(`employee`).subscribe(
      (res :any) => {
        this.statusData = res;
        this.secondForm();
      },
      (err) => {
        console.log(err);
      }
    )
  }
  toggle(){
    this.toggleValue = !this.toggleValue;
    // this.dataServise.putValue('')
  }

  getPendingData() {
    this.dataServise.getData(`employee`).subscribe(
      (res) => {
        this.TICKET_DATA = res;
        this.dataSource = new MatTableDataSource(
          this.TICKET_DATA
        );
        setTimeout(() =>{
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        }, 1)
        this.ifGetData = true;
      },
      (err) => {
        this.ifGetData = true;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<TicketElement>(this.TICKET_DATA);
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
  // UserPostPut
  exportNormalTable() {
    const onlyNameAndSymbolArr: Partial<TicketElement>[] =
      this.dataSource.filteredData.map((x: TicketElement) => ({
        connectionID: x.connectionID,
        ticketID: x.ticketID,
        createdBy: x.createdBy,
        assignedTo: x.assignedTo,
        assignedToID: x.assignedToID,
        updatedBy: x.updatedBy,
        subject: x.subject,
        description: x.description,
        reason: x.reason,
        phone: x.phone,
        status: x.status,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
      }));
    // TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "ExampleArray");
    // TableUtil.exportTableToExcel('ExampleNormalTable', 'test');
  }
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  UpadteUserDialogBox(): void {
    const dialogRef = this.dialog.open(UserPostPut, {
      width: '550px',
      data: { subscriberdata: this.subscriberdata, sendtype: this.sendtype },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.animal = result;
      // this.getPendingData();
    });
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
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
    // this.showTable = false;
    this.sendtype = 'PUT';
    this.subscriberdata = us;
    this.UpadteUserDialogBox();
    // this.isSubscriberdata=true;
  }
}

// export interface UserSetting {
//   userID: number;
//   firstName: string;
//   roleID: string;
//   branchID: string;
//   status: string;
//   createdDate: string;
// }
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
  name: string;
  role: string;
  branch: string;
  userID: number;
  firstName: string;
  roleID: string;
  branchID: string;
  createdDate: string;
}
