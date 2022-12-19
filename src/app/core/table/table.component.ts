import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  // dataSource: Object | undefined;
  myDataSource = {
    chart: {
      // caption: "User Registrations",
      // yaxisname: "# of Tickets",
      // subcaption: "Last week",
      numdivlines: "3",
      showvalues: "0",
      legenditemfontsize: "15",
      legenditemfontbold: "1",
      plottooltext: "<b>$dataValue</b>  $seriesName on $label",
      theme: "fusion",
      "captionFont": "Montserrat",
      "captionFontSize": "28",
      "captionAlignment": "left"
    },
    categories: [
      {
        category: [
          {
            label: "Monday"
          },
          {
            label: "Tuesday"
          },
          {
            label: "Wednesday"
          },
          {
            label: "Thursday"
          },
          {
            label: "Friday"
          },
          {
            label: "Saturday"
          },
          {
            label: "Sunday"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "User",
        data: [
          {
            value: "10"
          },
          {
            value: "25"
          },
          {
            value: "30"
          },
          {
            value: "10"
          },
          {
            value: "50"
          },
          {
            value: "40"
          },
          {
            value: "100"
          }
        ]
      },
     
    ]
  };
  constructor() {
  }
  ngOnInit(): void {
  }

}
