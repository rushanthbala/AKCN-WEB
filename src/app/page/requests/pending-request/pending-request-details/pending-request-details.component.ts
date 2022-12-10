import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingChangeRequestComponent } from 'src/app/core/dialogBox/pending/assign-request/change-request.component';
import { CancelDialogBoxComponent } from 'src/app/core/dialogBox/pending/cancel-dialog-box/dialog-box.component';

@Component({
  selector: 'app-pending-request-details',
  templateUrl: './pending-request-details.component.html',
  styleUrls: ['./pending-request-details.component.scss']
})
export class PendingRequestDetailsComponent {
  animal: string | any;
  name: string | any;

  constructor(private fb: FormBuilder,public dialog: MatDialog) {}
  @Input() object:object | any;
  @Input() text:string | any;
  @Output() backTo = new EventEmitter<any>()

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
   AssignOpenDialog(): void {
    const dialogRef = this.dialog.open(PendingChangeRequestComponent, {
      width: '250px',
      data: {id:"PKA0001", animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  CancelRequests(): void {
    const dialogRef = this.dialog.open(CancelDialogBoxComponent, {
      width: '250px',
      data: {id:"PKA0001", animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }  
  Back(){
    this.backTo.emit()
  }
}
