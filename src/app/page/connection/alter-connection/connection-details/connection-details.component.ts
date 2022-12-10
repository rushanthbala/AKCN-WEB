import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { EditConnectionDialogComponent } from 'src/app/core/dialogBox/connection/edit-connection-dialog/edit-connection-dialog.component';
import { EditSubscriberDialogComponent } from 'src/app/core/dialogBox/connection/edit-subscriber-dialog/edit-subscriber-dialog.component';
import { ReconnectBigDialogComponent } from 'src/app/core/dialogBox/connection/reconnect-big-dialog/reconnect-big-dialog.component';
import { ReconnectDialogComponent } from 'src/app/core/dialogBox/connection/reconnect-dialog/reconnect-dialog.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';

@Component({
  selector: 'app-connection-details',
  templateUrl: './connection-details.component.html',
  styleUrls: ['./connection-details.component.scss']
})
export class ConnectionDetailsComponent  implements OnInit {
  // model
  animal: string | any;
  name: string | any;
  constructor(private fb: FormBuilder,public dialog: MatDialog) {}
  @Input() object:object | any;
  @Input() text:string | any;
  
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
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openReconnectBigDialog(): void {
    const dialogRef = this.dialog.open(ReconnectBigDialogComponent, {
      width: '550px',
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  editSubscriber(): void {
    const dialogRef = this.dialog.open(EditSubscriberDialogComponent, {
      width: '550px',
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  editConnection(): void {
    const dialogRef = this.dialog.open(EditConnectionDialogComponent, {
      width: '600px',
      data:this.object,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog4(): void {
    const dialogRef = this.dialog.open(ExtraRequestDialogBoxComponent, {
      width: '250px',
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
}
