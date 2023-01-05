import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingChangeRequestComponent } from 'src/app/core/dialogBox/request/assign-request/change-request.component';
import { CancelDialogBoxComponent } from 'src/app/core/dialogBox/request/cancel-dialog-box/dialog-box.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-pending-request-details',
  templateUrl: './pending-request-details.component.html',
  styleUrls: ['./pending-request-details.component.scss']
})
export class PendingRequestDetailsComponent {
  animal: string | any;
  name: string | any;

  constructor(private fb: FormBuilder,public dialog: MatDialog, public dataServise: HttpService) {}
  @Input() object:object | any;
  @Input() text:string | any;
  @Output() backTo = new EventEmitter<any>()

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
   AssignOpenDialog(): void {
    const dialogRef = this.dialog.open(PendingChangeRequestComponent, {
      width: '250px',
      data:{TicketData:this.object, allData:this.allData}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  CancelRequests(): void {
    const dialogRef = this.dialog.open(CancelDialogBoxComponent, {
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
