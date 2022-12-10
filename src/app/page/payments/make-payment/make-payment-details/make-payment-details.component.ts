import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ChangeRequestComponent } from 'src/app/core/dialogBox/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from 'src/app/core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { ApplyDiscountDialogBoxComponent } from 'src/app/core/dialogBox/payment/apply-discount-dialog-box/apply-discount-dialog-box.component';
import { UpdatePaymentComponent } from 'src/app/core/dialogBox/payment/update-payment/update-payment.component';

@Component({
  selector: 'app-make-payment-details',
  templateUrl: './make-payment-details.component.html',
  styleUrls: ['./make-payment-details.component.scss']
})
export class MakePaymentDetailsComponent   implements OnInit {
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
  applyDiscount(): void {
    const dialogRef = this.dialog.open(ApplyDiscountDialogBoxComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  makePayment(): void {
    const dialogRef = this.dialog.open(UpdatePaymentComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog3(): void {
    const dialogRef = this.dialog.open(ExtraRequestDialogBoxComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openDialog4(): void {
    const dialogRef = this.dialog.open(ExtraRequestDialogBoxComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
}