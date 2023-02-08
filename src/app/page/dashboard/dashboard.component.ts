import { style } from '@angular/animations';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpService } from 'src/app/servise/http/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
Chart.register(...registerables);

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
  // userArray: any = [
  //   {
  //     id: 1,
  //     name: 'rushanth',
  //     Image: 'https://i.ytimg.com/vi/Rk3T__b2mDg/maxresdefault.jpg',
  //     email: 'sample@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 2,
  //     name: 'Janu',
  //     Image: 'image url',
  //     email: 'sample2@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 3,
  //     name: 'stelin',
  //     Image: 'image url',
  //     email: 'sample3@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 4,
  //     name: 'Shan',
  //     Image: 'image url',
  //     email: 'sample4@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 5,
  //     name: 'rushanth',
  //     Image: 'image url',
  //     email: 'sample5@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 6,
  //     name: 'Janu',
  //     Image: 'image url',
  //     email: 'sample6@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 7,
  //     name: 'stelin',
  //     Image: 'image url',
  //     email: 'sample7@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 8,
  //     name: 'Shan',
  //     Image: 'image url',
  //     email: 'sample@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 9,
  //     name: 'stelin',
  //     Image: 'image url',
  //     email: 'sample@gmail.com',
  //     points: 1212,
  //   },
  //   {
  //     id: 10,
  //     name: 'Shan',
  //     Image: 'image url',
  //     email: 'sample@gmail.com',
  //     points: 1212,
  //   },
  // ];
  p: number = 1;

  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    // console.log(ctrlValue, 'llll')
    datepicker.close();
  }

  ngOnInit(): void {
    // this.userData = this.userArray;
    this.futureDateDisable();
    this.initialForm();
    this.initialMonthForm();
    this.dailyCollection();
    this.newConnection();
    this.dailyReconnection();
    this.dailyLocationChange();
    this.monthlyConnection();
    this.monthlyNewConnection();
    this.monthlyReConnection();
    this.monthlyLocationChange();
    this.todayCollectionReport();
    // this.renderChart(this.labledata, this.realdata);
    this.anualReport();
    this.areaReport();
  }

  initialForm() {
    this.submitForm = this.fb.group({
      fromdate: '',
    });
  }

  initialMonthForm(){
    this.submitMonthForm = this.fb.group({
      date:'',
    })
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

  //monthly
  monthlyConnection() {
    this.dataService
      .getData(`dashboard/getMonthlyCollections/${this.currentMonth}`)
      .subscribe(
        (res) => {
          this.monthlyConnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  monthlyNewConnection() {
    this.dataService
      .getData(`dashboard/getMonthlyNewConnections/${this.currentMonth}`)
      .subscribe(
        (res) => {
          this.monthlyNewConnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  monthlyReConnection() {
    this.dataService
      .getData(`dashboard/getMonthlyReconnections/${this.currentMonth}`)
      .subscribe(
        (res) => {
          this.monthylReconnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  monthlyLocationChange() {
    this.dataService
      .getData(`dashboard/getMonthlyLocationChange/${this.currentMonth}`)
      .subscribe(
        (res) => {
          this.montlhyLocationChangeData = res;
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
              this.annualReportData[i].month.substring(0, 3)
            );
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
      .getData(`dashboard/collectionsByAgent/${this.maxDate}`)
      .subscribe(
        (res) => {
          this.areaData = res;
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
