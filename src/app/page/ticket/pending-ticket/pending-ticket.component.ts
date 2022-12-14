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
import { TableUtil } from './tableUtils';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpService } from 'src/app/servise/http/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pending-ticket',
  templateUrl: './pending-ticket.component.html',
  styleUrls: ['./pending-ticket.component.scss'],
})
export class PendingTicketComponent implements AfterViewInit, OnInit {
  TICKET_DATA = [];
  dataSource: any;
  displayedColumns: string[] = [
    'ticketID',
    'connectionID',
    'description',
    'phone',
    'createdBy',
    'createdAt',
  ];
  EmployeeData: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dataServise: HttpService,
    private fb: FormBuilder
  ) {}
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  userData: any;
  //
  loading: boolean = false;
  ifGetData: boolean = false;
  errmsg: string = '';
  sucmsg: string = '';
  suburl: string = 'connection';
  // table variable
  // change show table true
  showTable: boolean = true;
  subscriberdata: any = {};
  isSubscriberdata: boolean = false;

  tableResult: any;
  p: number = 1;
  submit: FormGroup | any;
  ngOnInit() {
    this.getPendingData();
    this.getEmployee();
    this.initialForm();
  }
  initialForm() {
    this.submit = this.fb.group({
      address: '',
    });
  }
  getPendingData() {
    this.dataServise.getData(`ticket/status/pending`).subscribe(
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

  getEmployee() {
    this.dataServise.getData(`employee`).subscribe(
      (res) => {
        // let array = res;

        // array.map((item: any) => {
        // console.log(item.firstName)
        this.EmployeeData = res;
        // })
        // console.log("1", res)
        this.ifGetData = true;
      },
      (err) => {
        this.ifGetData = true;
      }
    );
  }



  convertIdToName(name: any) {
    let employeeName = '';
    this.EmployeeData?.map((item: any) => {
      if (item.id == name) {
        employeeName = item.firstName;
      } else {
        employeeName = '--';
      }
    });
    return employeeName;
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
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, 'PendingTicket');
    // TableUtil.exportTableToExcel('ExampleNormalTable', 'test');
  }
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('pending-ticket.pdf');
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(us: any) {
    this.showTable = false;
    this.subscriberdata = us;
    this.isSubscriberdata = true;
  }
  detailhide() {
    this.showTable = true;
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
