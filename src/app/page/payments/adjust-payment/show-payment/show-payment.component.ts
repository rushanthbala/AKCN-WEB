import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { EditConnectionDialogComponent } from 'src/app/core/dialogBox/connection/edit-connection-dialog/edit-connection-dialog.component';
import { EditSubscriberDialogComponent } from 'src/app/core/dialogBox/connection/edit-subscriber-dialog/edit-subscriber-dialog.component';
import { ReconnectBigDialogComponent } from 'src/app/core/dialogBox/connection/change-location-big-dialog/reconnect-big-dialog.component';
import { ReconnectDialogComponent } from 'src/app/core/dialogBox/connection/disconnect-dialog/reconnect-dialog.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { DisconnectDialogBoxComponent } from 'src/app/core/dialogBox/disconnect-dialog-box/dialog-box.component';
import { ConnectDialogComponent } from 'src/app/core/dialogBox/connection/connect-dialog/connect-dialog.component';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-show-payment',
  templateUrl: './show-payment.component.html',
  styleUrls: ['./show-payment.component.scss']
})
export class ShowPaymentComponent {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}
  @Input() object: object | any;
  @Input() text: string | any;

  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;


  ngOnInit(): void {
    // this.openReconnectBigDialog()
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

}
