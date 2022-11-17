import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

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

  constructor() {}

  sdata = [
    {
      id: 1,
      name: 'COLLECTION',
      number: '143350',
      img: true,
    },
    {
      id: 2,
      name: 'NEW CONNECTION',
      number: '143350',
      img: false,
    },
    {
      id: 3,
      name: 'RECONNECTION',
      number: '143350',
      img: true,
    },
    {
      id: 4,
      name: 'LINE CHANGE',
      number: '143350',
      img: true,
    },
    {
      id: 1,
      name: 'MONTHLY COLLECTION',
      number: '143350',
      img: true,
    },
    {
      id: 2,
      name: 'MONTHLY NEW CONNECTION',
      number: '143350',
      img: true,
    },
    {
      id: 3,
      name: 'PROFITS',
      number: '143350',
      img: true,
    },
    {
      id: 4,
      name: 'MONTHLY RECONNECTION',
      number: '143350',
      img: true,
    },
  ];
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
    this.getAllTableData();
    this.userData = this.userArray;

    // this.getAllCardData();
  }
  loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.tableDatasetsData,
            label: 'User',
            backgroundColor: '#fff',
            tension: 0.4,
            borderColor: 'blue',
            // pointBackgroundColor:"red"    //
          },
        ],
        labels: this.tableDatasetsDate,
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 80,
            },
          },
        },
      },
    });
  }
  getAllTableData() {
    // this.dataServise.getAllData('api/userSummary').subscribe((res) => {
    // console.log(res.value === 1 ? true : false, '====');
    // console.log(res, 'res');
    let res = [
      { create_date: '2022-06-14', total: 10 },
      { create_date: '2022-06-15', total: 48 },
      { create_date: '2022-06-16', total: 80 },
      { create_date: '2022-06-17', total: 65 },
      { create_date: '2022-06-18', total: 43 },
      { create_date: '2022-06-19', total: 40 },
      { create_date: '2022-06-20', total: 40 },
      { create_date: '2022-06-21', total: 44 },
      { create_date: '2022-06-22', total: 47 },
    ];
    let last7Array = [];
    last7Array = res.slice(-7);
    console.log(last7Array);
    let data: any = [];
    let date: any = [];
    last7Array.map((item: any) => {
      data.push(item.total);
      date.push(item.create_date);
      console.log('==');
    });
    this.tableDatasetsData = data;
    this.tableDatasetsDate = date;
    console.log(data, '====================');
    this.chart = document.getElementById('chart');
    Chart.register(...registerables);
    this.loadChart();
    // });
  }
}
