import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup | any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  userData: any;
  // table variable
  // showTable :boolean |any;
  showTable:boolean=true ;
  tableResult : any;
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
    this.userData = this.userArray;
  }
  searching(first:Object|any) {
    console.log("this.loginForm.value"+first.searchinginput,first.type);
    this.showTable= true

  }
  viewDetails(){
    this.showTable= false
  }
}
