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
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-all-connection',
  templateUrl: './all-connection.component.html',
  styleUrls: ['./all-connection.component.scss'],
})
export class AllConnectionComponent implements AfterViewInit, OnInit {
  TICKET_DATA = [];
  dataSource: any;
  displayedColumns: string[] = [
    'connectionID',
    'firstName',
    'primaryPhone',
    'connectionAddress',
    'connectionStatus',
    'connectedDate',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dataServise: HttpService,
    private router: Router,
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
    this.dataServise.getData(`connection/subscriber`).subscribe(
      (res) => {
        this.TICKET_DATA = res;
        this.dataSource = new MatTableDataSource(this.TICKET_DATA);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
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
  exportNormalTable() {
    const onlyNameAndSymbolArr: Partial<TicketElement>[] =
      this.dataSource.filteredData.map((x: TicketElement) => ({
        connectionID: x.connectionID,
        firstName:x.firstName,
        primaryPhone:x.primaryPhone,
        connectionAddress:x.connectionAddress,
        actionDate:x.actionDate,
        status: x.status
      }));
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, 'all-connection');
    // TableUtil.exportTableToExcel('ExampleNormalTable', 'test');
  }
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;

  public openPDF(): void {
    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });

    let date : any = new Date();
    let year : any = date.getFullYear();
    let month : any = date.getMonth() + 1;
    let todayDate : any = date.getDate();

    if(month < 10){
      month = '0' + month;
    }
    if(todayDate < 10){
      todayDate = '0' + todayDate;
    }

    var output = year + "-" + month + "-" + todayDate;

    let doc = new jsPDF();
    doc.text("All Connection Details  "+ output, 75, 10)
    autoTable(doc, {html:"#ExampleNormalTable", theme:'striped', margin:{top: 20}});
    doc.save('all-connection '+ output)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(id: any) {
    this.router.navigate([`auth/alter-connection/history/${id.id}`]);
    // this.connectionId = id.id;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface TicketElement {
  actionDate: string;
  connectionAddress: string;
  primaryPhone: number;
  firstName: string;
  connectionID: number;
  status: string;
}
