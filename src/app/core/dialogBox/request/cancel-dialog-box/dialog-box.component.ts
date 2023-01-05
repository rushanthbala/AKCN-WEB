import { formatDate } from '@angular/common';
import {Component, Inject,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted = false

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
      Remark: new FormControl('', [Validators.required])
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.Reconnection.controls;
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
    // if (dataObj.reason == ""
    // ) {
    //   this.isEmpty();
    // } 
    if(!this.Reconnection.valid){
      this.submitted = true;
      return
    }
    else {
      this.loading =true
      this.dataServise.putValue(`request/cancel/${this.data.TicketData.id}`, dataObj).subscribe(
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
    this.toastr.error('Fill All The Field', 'Error');
  }
}
export interface DialogData {
  animal: string;
  id: string;
  
}

















