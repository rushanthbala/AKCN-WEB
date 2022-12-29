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
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {
  // @Output() OnClick = new EventEmitter<{
  //   connectionid: any;
  // }>();
  // model
  animal: string | any;
  name: string | any;
  connectionId: any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}
  @Input() object: object | any;
  @Input() text: string | any;

  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
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

  searching() {
    console.log(this.loginForm.value);
  }
  // model form function
  ReconnectionRequest() {
    console.log(this.Reconnection.value);
  }
  ChangeRequest() {
    console.log(this.Reconnection.value);
  }
  ExtraRequest() {
    console.log(this.Reconnection.value);
  }
  openReconnectDialog(): void {
    const dialogRef = this.dialog.open(ReconnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openChangeLocationDialog(): void {
    const dialogRef = this.dialog.open(ReconnectBigDialogComponent, {
      width: '550px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  editSubscriber(): void {
    const dialogRef = this.dialog.open(EditSubscriberDialogComponent, {
      width: '550px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  editConnection(): void {
    const dialogRef = this.dialog.open(EditConnectionDialogComponent, {
      width: '600px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // DisconnectDialogBoxComponent
  DisconnectDialog(): void {
    const dialogRef = this.dialog.open(ReconnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ConnectDialog(): void {
    const dialogRef = this.dialog.open(ConnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  viewDetails(id: any) {
    this.router.navigate([`auth/alter-connection/history/${id.id}`]);
    console.log(id.id);
    console.log('component chnaged');
    // this.connectionId = id.id;
  }

  // emitEvent() {
  //   let detailObj = {
  //     id: this.connectionId,
  //   };
  //   this.OnClick.emit({
  //     connectionid: detailObj,
  //   });
  // } {

}
