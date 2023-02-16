import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-apply-discount-dialog-box',
  templateUrl: './apply-discount-dialog-box.component.html',
  styleUrls: ['./apply-discount-dialog-box.component.scss'],
})
export class ApplyDiscountDialogBoxComponent implements OnInit {
  public open: Boolean = true;
  public loading: Boolean = false;

  Reconnection: FormGroup | any;
  submitted = false;
  currentUser: any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<ApplyDiscountDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      Remark: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.Reconnection.controls;
  }
  apply() {
    let todayDate = new Date();
    const auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(auth);

    let dataObj = {
      connectionID: this.data.id,
      paidDateTime: formatDate(todayDate, 'yyyy-MM-dd', 'en-US'),
      description: this.Reconnection.value.Remark,
      paymentType: 'DISCOUNT',
      amount: this.Reconnection.value.amount,
      enteredBy: this.currentUser.firstName,
      conductedBy: this.currentUser.firstName,
      phoneNo: this.data.primaryPhone,
    };
    if (!this.Reconnection.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataServise.postValue('payment', dataObj).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            this.showSuccess();
            this.loading = false;
            this.onNoClick();
          }
        },
        (e) => {
          this.loading = false;
        }
      );
    }
  }
  showSuccess() {
    this.toastr.success('Sucessfully Make a Payment', 'Sucessfully');
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
export interface DialogData {
  animal: string;
  id: string;
}
