import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket-cancel-dialog-box',
  templateUrl: './ticket-cancel-dialog-box.component.html',
  styleUrls: ['./ticket-cancel-dialog-box.component.scss'],
})
export class TicketCancelDialogBoxComponent implements OnInit {
  public loading: Boolean = true;

  public open: Boolean = true;
  Reconnection: FormGroup | any;
  submitted = false;
  currentUser: any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    const auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(auth);
  }
  constructor(
    public dialogRef: MatDialogRef<TicketCancelDialogBoxComponent>,
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
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.Reconnection.controls;
  }
  updateCancel() {
    let newDate = new Date();
    let dataObj = {
      reason: this.Reconnection.value.Remark,
      connectionID: this.data.id,
      createdBy: this.currentUser.firstName,
      createdAt: formatDate(newDate, 'yyyy-MM-dd', 'en-US'),
    };
    if (!this.Reconnection.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataServise
        .putValue(`ticket/cancel/${this.data.TicketData.id}`, dataObj)
        .subscribe(
          (res: any) => {
            if (res.errorMessage) {
              this.loading = false;
            } else {
              this.showSuccess();
              this.loading = false;
            }
          },
          (e) => {
            this.loading = false;
          }
        );
    }
  }

  showSuccess() {
    this.toastr.success('Sucessfully canceled  !', 'successful');
    this.onNoClick();
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
