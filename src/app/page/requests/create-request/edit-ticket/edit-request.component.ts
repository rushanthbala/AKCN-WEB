import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/request/change-request/change-request.component';
import { DisconnectDialogBoxComponent } from 'src/app/core/dialogBox/disconnect-dialog-box/dialog-box.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss'],
})


export class EditRequestComponent implements OnInit {
  // model
  animal: string | any;
  name: string | any;
  constructor(private fb: FormBuilder,public dialog: MatDialog,public dataServise: HttpService) {}
  @Input() object:object | any;
  @Input() text:string | any;
  
  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;
  pendingRequest: number | any =0;
  assignRequest: number | any =0;
  closeRequest: number | any =0;
  cancelRequest: number | any =0;
  ngOnInit(): void {
    
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
    this.getTicketCount()

  }
  getTicketCount() {
    this.dataServise.getData(`ticket/connectionId/${this.object.id}`).subscribe((res) => {
      // this.userData = res;
      // this.tableResult = this.userData.length
      // this.isFetchDataFail = false
      var allRequest: any = []
      allRequest = res
      allRequest.map((item: any) => {
        if (item.status == "PENDING") {
          this.pendingRequest = this.pendingRequest + 1
        }else  if (item.status == "ASSIGNED") {
          this.assignRequest = this.assignRequest + 1
        }else  if (item.status == "CLOSED") {
          this.closeRequest = this.closeRequest + 1
        } else  if (item.status == "CANCELLED") {
          this.cancelRequest = this.cancelRequest + 1
        }
      })
    }, (err) => {
      // this.isFetchDataFail = true
      // Request.pe
      this.pendingRequest = 0
      this.assignRequest = 0
      this.closeRequest = 0
      this.cancelRequest = 0
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
  DisconnectionOpenDialog(): void {
    const dialogRef = this.dialog.open(DisconnectDialogBoxComponent, {
      width: '250px',
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ChangeOpenDialog(): void {
    const dialogRef = this.dialog.open(ChangeRequestComponent, {
      width: '250px',
      data:this.object,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ExtraOpenDialog(): void {
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