import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cardAllData: any;
  chart: any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  userData: any;
  maxDate: any;
  submitForm: FormGroup | any

  constructor(private fb: FormBuilder) {}

  sdata = [
    {
      id: 1,
      name: 'COLLECTION',
      number: '143350',
      img: true,
      color: 'green',
    },
    {
      id: 2,
      name: 'NEW CONNECTION',
      number: '143350',
      img: false,
      color: 'red',
    },
    {
      id: 3,
      name: 'RECONNECTION',
      number: '143350',
      img: false,
      color: 'red',
    },
    {
      id: 4,
      name: 'LINE CHANGE',
      number: '143350',
      img: true,
      color: 'green',
    }
  ];
  mData = [
    {
      id: 1,
      name: 'COLLECTION',
      number: '143350',
      img: true,
      color: 'green',
    },
    {
      id: 2,
      name: 'NEW CONNECTION',
      number: '143350',
      img: false,
      color: 'red',
    },
    {
      id: 3,
      name: 'PROFITS',
      number: '143350',
      img: false,
      color: 'red',
    },
    {
      id: 4,
      name: 'RECONNECTION',
      number: '143350',
      img: true,
      color: 'green',
    },
  ]
  userArray: any = [
    {
      id: 1,
      name: 'rushanth',
      Image: 'https://i.ytimg.com/vi/Rk3T__b2mDg/maxresdefault.jpg',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 2,
      name: 'Janu',
      Image: 'image url',
      email: 'sample2@gmail.com',
      points: 1212,
    },
    {
      id: 3,
      name: 'stelin',
      Image: 'image url',
      email: 'sample3@gmail.com',
      points: 1212,
    },
    {
      id: 4,
      name: 'Shan',
      Image: 'image url',
      email: 'sample4@gmail.com',
      points: 1212,
    },
    {
      id: 5,
      name: 'rushanth',
      Image: 'image url',
      email: 'sample5@gmail.com',
      points: 1212,
    },
    {
      id: 6,
      name: 'Janu',
      Image: 'image url',
      email: 'sample6@gmail.com',
      points: 1212,
    },
    {
      id: 7,
      name: 'stelin',
      Image: 'image url',
      email: 'sample7@gmail.com',
      points: 1212,
    },
    {
      id: 8,
      name: 'Shan',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 9,
      name: 'stelin',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
    {
      id: 10,
      name: 'Shan',
      Image: 'image url',
      email: 'sample@gmail.com',
      points: 1212,
    },
  ];
  p: number = 1;

  ngOnInit(): void {
    // this.getAllTableData();
    this.renderChart();
    this.userData = this.userArray;
    this.futureDateDisable();
    // this.getAllCardData();
    this.initialForm()
  }

  initialForm(){
    this.submitForm = this.fb.group({
      fromdate:''
    })
  }

  renderChart() {
    const myChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: [3, 4, 2, 4, 5, 6, 5, 4, 5, 3, 4, 6],
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
  futureDateDisable(){
    var date :any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if(todayDate < 10){
      todayDate = "0" + todayDate; //1,2..9
    }
    if(month < 10){
      month = "0" + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;  //2022-12-31

  }
}
