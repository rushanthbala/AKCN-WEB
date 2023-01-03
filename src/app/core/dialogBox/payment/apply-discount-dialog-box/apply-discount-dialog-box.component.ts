import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<ApplyDiscountDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,

  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      Remark: '',
      amount: ""
    });
  }
  apply() {
    let todayDate =new Date()
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null
    console.log(this.Reconnection.value);
  
    
    let dataObj ={
      connectionID:this.data.id,
      paidDateTime:formatDate(todayDate, 'yyyy-MM-dd', "en-US"),
      description: this.Reconnection.value.Remark,
      paymentType:"DISCOUNT",
      amount:this.Reconnection.value.amount,
      enteredBy:adminId,
      conductedBy:adminId,
      phoneNo:this.data.primaryPhone
    }
    console.log(dataObj, "data");

    if (dataObj.description == "" || dataObj.amount == ""
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('payment', dataObj).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            this.showSuccess()
            this.loading = false;
            this.onNoClick()
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
    window.location.reload()

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

















