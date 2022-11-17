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

  userArray: any = [
    {
      ID: 1,
      TICKET: 'rushanth',
      SUBJECT: '0776450707',
      PHONE: 'add 01',
      CREATED_BY: '1212',
      CREATED_AT: '21',
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
    this.initialForm();
    this.userData = this.userArray;
  }

  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
}
