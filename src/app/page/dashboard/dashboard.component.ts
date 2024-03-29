import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpService } from 'src/app/servise/http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cardAllData: any;
  chart: any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  userData: any;
  maxDate: any;
  submitForm: FormGroup | any;
  submitMonthForm: FormGroup | any;

  @ViewChild('picker') picker: any;
  name = 'Angular ' + VERSION.major;
  collectionData: any = [];
  dailyConnection: any = [];
  reConnection: any = [];
  locationChange: any;
  connectionData: any;
  currentMonth: any;
  monthlyConnectionData: any;
  monthlyNewConnectionData: any;
  monthylReconnectionData: any;
  montlhyLocationChangeData: any;
  todayData: any;
  annualReportData: any;
  dataSource: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  labledata: any[] = [];
  realdata: any[] = [];
  selectDate: any;
  selected: any;
  selectCollection: any;
  selectedForMonthly: any;
  dataSource1: any;
  displayedColumns1: string[] = ['area', 'paidAmount', 'unpaidAmount']
  areaData: any;
  toggle() {
    this.picker.open();
  }

  constructor(private fb: FormBuilder, private dataService: HttpService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  p: number = 1;

  ngOnInit(): void {
    this.futureDateDisable();
    this.initialForm();
    this.dailyCollection();
    this.newConnection();
    this.dailyReconnection();
    this.dailyLocationChange();
    this.todayCollectionReport();
    this.anualReport();
    this.areaReport();
  }

  initialForm() {
    this.submitForm = this.fb.group({
      fromdate: '',
    });
  }

  renderChart(labledata: any, maindata: any) {
    const myChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: labledata,
        datasets: [
          {
            data: maindata,
            borderWidth: 2,
            borderColor: '#2CD9C5',
            backgroundColor: ['#2CD9C51A', '#2E5BFF00'],
            fill: true,
            pointBackgroundColor: ['white'],
            pointBorderColor: ['#2CD9C5'],
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
  futureDateDisable() {
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if (todayDate < 10) {
      todayDate = '0' + todayDate; //1,2..9
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + '-' + month + '-' + todayDate; //2022-12-31
    this.currentMonth = year + '-' + month + '-' + '01';
  }

  // daily
  dailyCollection() {
    this.dataService
      .getData(`dashboard/getDailyCollections/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.collectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  newConnection() {
    this.dataService
      .getData(`dashboard/getDailyNewConnections/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.dailyConnection = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  dailyReconnection() {
    this.dataService
      .getData(`dashboard/getDailyReconnections/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.connectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  dailyLocationChange() {
    this.dataService
      .getData(`dashboard/getDailyLocationChange/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.locationChange = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  
  //today collection report
  todayCollectionReport() {
    this.dataService
      .getData(`dashboard/collectionsByAgent/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.todayData = res;
          this.dataSource = new MatTableDataSource(this.todayData);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 1);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //annual report
  anualReport() {
    this.dataService.getData(`dashboard/monthlyGraph`).subscribe(
      (res) => {
        this.annualReportData = res.slice(-12);
        if (this.annualReportData != null) {
          for (let i = 0; i < this.annualReportData.length; i++) {
            this.labledata?.push(
              this.annualReportData[i].month?.substring(0, 3)
            );5
            this.realdata?.push(this.annualReportData[i].totalAmount);
          }
          this.renderChart(this.labledata, this.realdata);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getDate(event: any) {
    var selectDate = event?.getDate();
    if (selectDate < 10) {
      selectDate = '0' + selectDate;
    }
    var selectYear = event?.getFullYear();
    var selectMonth = event?.getMonth() + 1;
    if (selectMonth < 10) {
      selectMonth = '0' + selectMonth;
    }
    this.selected = selectYear + '-' + selectMonth + '-' + selectDate;

    this.selectedForMonthly = selectYear + '-' + selectMonth + '-' + '01';

    //collection
    this.dataService
      .getData(`dashboard/getDailyCollections/${this.selected}`)
      .subscribe(
        (res) => {
          this.collectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );

    //new connection
    this.dataService
      .getData(`dashboard/getDailyNewConnections/${this.selected}`)
      .subscribe(
        (res) => {
          this.dailyConnection = res;
        },
        (err) => {
          console.log(err);
        }
      );

    //re connection
    this.dataService
      .getData(`dashboard/getDailyReconnections/${this.selected}`)
      .subscribe(
        (res) => {
          this.connectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );

    //location change
    this.dataService
      .getData(`dashboard/getDailyLocationChange/${this.selected}`)
      .subscribe(
        (res) => {
          this.locationChange = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  areaReport(){
    this.dataService
      .getData(`dashboard/areaTable`)
      .subscribe(
        (res) => {
          this.areaData = res.reverse();
          this.dataSource1 = new MatTableDataSource(this.areaData);
          setTimeout(() => {
            this.dataSource1.paginator = this.paginator;
          }, 1);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
