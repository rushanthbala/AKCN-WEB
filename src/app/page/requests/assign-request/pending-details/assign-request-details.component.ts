import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingChangeRequestComponent } from 'src/app/core/dialogBox/request/assign-request/change-request.component';
import { CancelDialogBoxComponent } from 'src/app/core/dialogBox/request/cancel-dialog-box/dialog-box.component';
import { ClosedRequestComponent } from 'src/app/core/dialogBox/request/close-request/closed-request.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-assign-request-details',
  templateUrl: './assign-request-details.component.html',
  styleUrls: ['./assign-request-details.component.scss']
})
export class AssignRequestDetailsComponent {
  animal: string | any;
  name: string | any;
  @Output() backTo = new EventEmitter<any>()

  constructor(private fb: FormBuilder,public dialog: MatDialog, public dataServise: HttpService) {}
  @Input() object:object | any;
  @Input() text:string | any;

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
  }
  // model form function
  ReconnectionRequest() {
  }
  ChangeRequest() {
  }
  ExtraRequest() {
  }
  CloseOpenDialog(): void {
    const dialogRef = this.dialog.open(ClosedRequestComponent, {
      width: '250px',
      data:{TicketData:this.object, allData:this.allData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  CancelTicket(): void {
    const dialogRef = this.dialog.open(CancelDialogBoxComponent, {
      width: '250px',
      data:{TicketData:this.object, allData:this.allData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }  
  TransferTicket(): void {
    const dialogRef = this.dialog.open(PendingChangeRequestComponent, {
      width: '250px',
      data:{TicketData:this.object, allData:this.allData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  } 
  Back(){
    this.backTo.emit()
  }
}
