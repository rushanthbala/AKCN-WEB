import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pending-one-ticket',
  templateUrl: './pending-one-ticket.component.html',
  styleUrls: ['./pending-one-ticket.component.scss'],
})
export class PendingOneTicketComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialInputForm() {
    this.inputset = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialChangeForm() {
    this.Change = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialExtraForm() {
    this.Extra = this.fb.group({
      numberOfTV: '',
      phoneNumber: '',
    });
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      phoneNumber: '',
      address: '',
      area: '',
      road: '',
    });
  }
  searching() {
    // console.log(this.loginForm.value);
  }
  // model form function
  ReconnectionRequest() {
    // console.log(this.Reconnection.value);
  }
  ChangeRequest() {
    // console.log(this.Reconnection.value);
  }
  ExtraRequest() {
    // console.log(this.Reconnection.value);
  }
}
