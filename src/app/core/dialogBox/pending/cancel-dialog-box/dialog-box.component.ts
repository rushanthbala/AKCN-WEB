import { formatDate } from '@angular/common';
import {Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-cancel-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class CancelDialogBoxComponent  implements OnInit  {
  public open: Boolean = true;
  public loading: Boolean = false;

  Reconnection: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<CancelDialogBoxComponent>,
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
  ReconnectionRequest() {

    let newDate = new Date();
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null

    let dataObj = {
      "updatedBy": adminId,
      "updatedAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),
      "closedAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),
      "reason":this.Reconnection.value.Remark,
      // "assignedTo": this.TechnicianName,
      // "assignedToID": this.TechnicianId,
    };
    if (dataObj.reason == ""
    ) {
      this.isEmpty();
    } else {
      this.loading =true
      this.dataServise.putValue(`request/cancel/${this.data.id}`, dataObj).subscribe(
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
    this.toastr.success('Sucessfully Cancel', 'Sucessfully');
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
export interface DialogData {
  animal: string;
  id: string;
  
}

















