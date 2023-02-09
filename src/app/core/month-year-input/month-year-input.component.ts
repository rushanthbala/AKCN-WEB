import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { HttpService } from 'src/app/servise/http/http.service';

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
  selector: 'app-month-year-input',
  templateUrl: './month-year-input.component.html',
  styleUrls: ['./month-year-input.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthYearInputComponent {
  maxDate: any;
  monthlyConnectionData: any;
  monthlyNewConnectionData: any;
  monthylReconnectionData: any;
  montlhyLocationChangeData: any;
  currentMonth: any;

  constructor(private dataService: HttpService) {}

  date = new FormControl(moment());

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    var monthly: any = ctrlValue.month() + 1;
    if (monthly < 10) {
      monthly = '0' + monthly;
    }
    var yearly: any = ctrlValue.year();

    var selectMonthly = yearly + '-' + monthly + '-' + '01';
    datepicker.close();

    this.dataService
      .getData(`dashboard/getMonthlyCollections/${selectMonthly}`)
      .subscribe(
        (res) => {
          this.monthlyConnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.dataService
      .getData(`dashboard/getMonthlyNewConnections/${selectMonthly}`)
      .subscribe(
        (res) => {
          this.monthlyNewConnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.dataService
      .getData(`dashboard/getMonthlyReconnections/${selectMonthly}`)
      .subscribe(
        (res) => {
          this.monthylReconnectionData = res;
        },
        (err) => {
          console.log(err);
        }
      );
    this.dataService
      .getData(`dashboard/getMonthlyLocationChange/${selectMonthly}`)
      .subscribe(
        (res) => {
          this.montlhyLocationChangeData = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit() {
    this.futureDateDisable();
    this.monthlyConnection();
    this.monthlyNewConnection();
    this.monthlyReConnection();
    this.monthlyLocationChange();
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
}
