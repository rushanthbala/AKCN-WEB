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
  public loading: Boolean = true;

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
    console.log(this.Reconnection.value);
    let data = {
      Remark: this.Reconnection.value.Remark,
      amount: this.Reconnection.value.amount,
    };
    console.log(data, "data");
    console.log(data.Remark == "", data.amount == ""
    );

    if (data.Remark == "" || data.amount == ""
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('admin/login', data).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            localStorage.setItem('auth', JSON.stringify(res.message));
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
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
export interface DialogData {
  animal: string;
  id: string;

}

















