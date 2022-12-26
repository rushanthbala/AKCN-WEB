import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-closed-change-request',
  templateUrl: './closed-request.component.html',
  styleUrls: ['./closed-request.component.scss']
})
export class ClosedRequestComponent implements OnInit  {
  public loading: Boolean = false;

  public open: Boolean = true;
  Reconnection: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<ClosedRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      Remark: ''
    });
  }
  updateCancel() {
    let newDate = new Date();
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null

    let dataObj = {
      updatedBy: adminId,
      "closedAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),
      "updatedAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),

    };
    if (false 
    ) {
      this.isEmpty();
    } else {
      this.loading =true
      this.dataServise.putValue(`request/close/${this.data.TicketData.id}`, dataObj).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            this.showSuccess()
            this.loading = false;
          }
        },
        (e) => {
          this.loading = false;
          this.showError()
        }
      );
    }
  }
  
  showSuccess() {
    this.toastr.success('Sucessfully Closed !', 'successful');
    this.onNoClick()
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
