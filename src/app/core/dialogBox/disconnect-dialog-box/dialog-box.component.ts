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
  selector: 'app-disconnect-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DisconnectDialogBoxComponent implements OnInit {
  public loading: Boolean = false;

  public open: Boolean = true;
  Reconnection: FormGroup | any;
  submitted = false;
  currentUser: any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<DisconnectDialogBoxComponent>,
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
      phoneNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.Reconnection.controls;
  }
  ReconnectionRequest() {
    let newDate = new Date();
    const auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(auth);

    let dataObj = {
      connectionID: this.data.id,
      requestType: 'Reconnection',
      description: this.Reconnection.value.description,
      phone: this.Reconnection.value.phoneNumber,
      createdBy: this.currentUser.firstName,
      createdAt: formatDate(newDate, 'yyyy-MM-dd', 'en-US'),
    };
    if (!this.Reconnection.valid) {
      this.submitted = true;
      return;
    } else {
      this.loading = true;
      this.dataServise.postValue('request', dataObj).subscribe(
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
    this.toastr.success('Sucessfully created !', 'successful');
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
  name: string;
}
