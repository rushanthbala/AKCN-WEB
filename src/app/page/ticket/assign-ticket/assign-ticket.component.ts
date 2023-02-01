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
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.scss'],
})
export class AssignTicketComponent implements AfterViewInit, OnInit {
  TICKET_DATA = [];
  dataSource: any;
  displayedColumns: string[] = [
    'ticketID',
    'connectionID',
    'description',
    'phone',
    'assignedTo',
    'createdAt',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dataServise: HttpService,
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
  ifGetData: boolean = false;

  subscriberdata: any = {};
  isSubscriberdata: boolean = false;

  tableResult: any;
  p: number = 1;
  submit: FormGroup | any;
  ngOnInit() {
    this.getPendingData();
    this.initialForm();
  }
  getPendingData() {
    this.dataServise.getData(`ticket/status/assigned`).subscribe(
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
  initialForm() {
    this.submit = this.fb.group({
      address: '',
    });
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
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, 'assign-ticket');

    // const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const EXCEL_EXTENSION = '.xlsx';

    // const worksheet = XLSX.utils.json_to_sheet(this.TICKET_DATA);

    // const workbook ={
    //   Sheets:{
    //     'testingSheet': worksheet
    //   },
    //   SheetNames: ['testingSheet']
    // }

    // const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type:'array'})

    // const blopData = new Blob([excelBuffer], {type:EXCEL_TYPE})
    // this.fileServer.save(blopData, "AssignTicket")

  }
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;

 openPDF() {
    // let DATA: any = document.getElementById('htmlData');
    // html2canvas(DATA).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jsPDF('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('assign-ticket.pdf');
    // });

    let date : any = new Date();
    let year : any = date.getFullYear();
    let month : any = date.getMonth() + 1;
    let todayDate : any = date.getDate();
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let seconds: any = date.getSeconds();

    if(month < 10){
      month = '0' + month;
    }
    if(todayDate < 10){
      todayDate = '0' + todayDate;
    }
    if(hours<10){
      hours = '0' + hours;
    }
    if(minutes < 10){
      minutes = '0' + minutes;
    }
    if(seconds < 10){
      seconds = '0' + seconds;
    }

    var output = year + "-" + month + "-" + todayDate;
    var output2 = hours + ":" + minutes + ":" + seconds;

    const doc = new jsPDF();
    doc.text("Assign Tickets/"+ output + '/' + output2, 60, 10)
    autoTable(doc, {html:"#ExampleNormalTable", theme:'striped', margin:{top: 20}});
    doc.save('assign-ticket ' + output + ' ' + output2)
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
