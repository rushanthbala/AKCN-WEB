import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingChangeRequestComponent } from 'src/app/core/dialogBox/request/assign-request/change-request.component';
import { CancelDialogBoxComponent } from 'src/app/core/dialogBox/request/cancel-dialog-box/dialog-box.component';
import { ClosedRequestComponent } from 'src/app/core/dialogBox/request/close-request/closed-request.component';
import { AssignTicketRequestDilogComponent } from 'src/app/core/dialogBox/ticket/assign-ticket-request/assign-ticket-request.component';
import { TicketCancelDialogBoxComponent } from 'src/app/core/dialogBox/ticket/cancel-dialog-box/ticket-cancel-dialog-box.component';
import { TicketCloseDialogBoxComponent } from 'src/app/core/dialogBox/ticket/close-dialog-box/ticket-close-dialog-box.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-assign-details',
  templateUrl: './assign-details.component.html',
  styleUrls: ['./assign-details.component.scss']
})
export class AssignDetailsComponent {
  animal: string | any;
  name: string | any;
  @Output() backTo = new EventEmitter<any>()

  constructor(private fb: FormBuilder, public dialog: MatDialog, public dataServise: HttpService) { }
  @Input() object: object | any;
  @Input() text: string | any;

  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;
  allData: object | any;

  ngOnInit(): void {
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
    this.getUserSingleData()

  }
  getUserSingleData() {
    this.dataServise.getData(`connection/id/${this.object.connectionID}`).subscribe((res) => {
      this.allData = res[0]
    }, (err) => {
    }
    );
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
  CloseOpenDialog(): void {
    const dialogRef = this.dialog.open(TicketCloseDialogBoxComponent, {
      width: '250px',
      data: this.allData,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  CancelTicket(): void {
    const dialogRef = this.dialog.open(TicketCancelDialogBoxComponent, {
      width: '250px',
      data: this.allData,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  TransferTicket(): void {
    const dialogRef = this.dialog.open(AssignTicketRequestDilogComponent, {
      width: '250px',
      data: this.allData,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  Back() {
    this.backTo.emit()
  }
}
