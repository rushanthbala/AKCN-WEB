import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import { findTypeUrl } from 'src/app/servise/utils/function';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  constructor(private fb: FormBuilder, public dataServise: HttpService,
  ) { }
  loginForm: FormGroup | any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  userData: any;
  // after posting
  loading: boolean = true;
  errmsg: string = ""
  sucmsg: string = ""
  suburl: string = "connection"
  // table variable
  showTable: boolean = false;
  subscriberdata:any={};
  isSubscriberdata:boolean=false;
  tableResult: any;
  
  userArray: any = [
    {
      id: 1,
      subscriber: 'rushanth',
      phone: '0776450707',
      address: 'add 01',
      status: '1212',
      tv: '21',
      type: 'NORMAL',
    },
    {
      id: 2,
      subscriber: 'rushanth',
      phone: '0776450707',
      address: 'add 01',
      status: '1212',
      tv: '21',
      type: 'NORMAL',
    },
    {
      id: 3,
      subscriber: 'rushanth',
      phone: '0776450707',
      address: 'add 01',
      status: '1212',
      tv: '21',
      type: 'NORMAL',
    },
    {
      id: 4,
      subscriber: 'rushanth',
      phone: '0776450707',
      address: 'add 01',
      status: '1212',
      tv: '21',
      type: 'NORMAL',
    },
    {
      id: 5,
      subscriber: 'rushanth',
      phone: '0776450707',
      address: 'add 01',
      status: '1212',
      tv: '21',
      type: 'NORMAL',
    },
  ];
  p: number = 1;

  ngOnInit(): void {
  }
  searching(first: Object | any) {
    var Ctype: string = first.type
    var url = findTypeUrl(Ctype)

    var cInput: String = first.searchinginput
    this.dataServise.getData(`${this.suburl}/${url}/${cInput}`).subscribe((res) => {
      this.userData = res;
      this.tableResult =this.userData.length
    });
    this.showTable = true;
  }
  viewDetails(us:any) {
    this.showTable = false;
    this.subscriberdata=us;
    this.isSubscriberdata=true;
    console.log(us);
    
  }
}
