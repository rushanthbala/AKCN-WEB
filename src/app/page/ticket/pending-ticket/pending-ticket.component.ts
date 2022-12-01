import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableUtil } from './tableUtils';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-pending-ticket',
  templateUrl: './pending-ticket.component.html',
  styleUrls: ['./pending-ticket.component.scss'],
})
export class PendingTicketComponent implements AfterViewInit, OnInit {
  ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  dataSource: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private _liveAnnouncer: LiveAnnouncer, public dataServise: HttpService) { }
  @ViewChild(MatSort) sort: MatSort | any;

  userData: any;

  userArray: any = [
    {
      id: 1,
      ticket: 'rushanth',
      subject: '0776450707',
      phone: 'add 01',
      createBy: '1212',
      createAt: '21',
    },
    {
      id: 1,
      ticket: 'rushanth',
      subject: '0776450707',
      phone: 'add 01',
      createBy: '1212',
      createAt: '21',
    },
    {
      id: 1,
      ticket: 'rushanth',
      subject: '0776450707',
      phone: 'add 01',
      createBy: '1212',
      createAt: '21',
    },
    {
      id: 1,
      ticket: 'rushanth',
      subject: '0776450707',
      phone: 'add 01',
      createBy: '1212',
      createAt: '21',
    },
  ];
  p: number = 1;
  ngOnInit() {
    this.getPendingData();
  }
  getPendingData() {
    console.log("okokok");
    
    this.dataServise.getData(`ticket/status/pending`).subscribe((res) => {
      // this.ELEMENT_DATA = res;
      console.log(res);
    });
  }
  ngAfterViewInit(): void {

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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
    console.log('ko');

    TableUtil.exportTableToExcel('ExampleNormalTable', 'test');
  }
  @ViewChild('content') content: ElementRef | any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  public SavePDF(): void {
    // let content = this.content.nativeElement;
    // let doc = new jsPDF();
    // let _elementHandlers = {
    //   '#editor': function (element: any, renderer: any) {
    //     return true;
    //   },
    // };
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   width: 190,
    //   elementHandlers: _elementHandlers,
    // });
    // doc.save('test.pdf');
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
}
