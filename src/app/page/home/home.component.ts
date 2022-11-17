import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/servise/dashboard/dashboard.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cardAllData: any;
  chart: any;
  tableDatasetsData: any;
  tableDatasetsDate: any;

  constructor(public dataServise: DashboardService) {}

  ngOnInit(): void {
    this.getAllTableData();
    this.getAllCardData();
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
    this.dataServise.getAllData('api/userSummary').subscribe((res) => {
      // console.log(res.value === 1 ? true : false, '====');
      console.log(res, 'res');
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
    });
  }
  getAllCardData() {
    this.dataServise.getAllData('api/dashboardSummary').subscribe((res) => {
      console.log(res, 'ressssssss');
      this.cardAllData = res;
      //   {
      //     "users": 2403,
      //     "comments": 45,
      //     "replyComments": 18
      // }
    });
  }
}
