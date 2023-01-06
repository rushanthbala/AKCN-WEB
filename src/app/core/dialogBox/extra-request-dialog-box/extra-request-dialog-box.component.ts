import { formatDate } from '@angular/common';
import {Component, Inject,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-extra-request-dialog-box',
  templateUrl: './extra-request-dialog-box.component.html',
  styleUrls: ['./extra-request-dialog-box.component.scss']
})
export class ExtraRequestDialogBoxComponent implements OnInit {
  public loading: Boolean = true;

  public open: Boolean = true;
  Reconnection: FormGroup | any;
  submitted = false
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<ExtraRequestDialogBoxComponent>,
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
      phoneNumber: new FormControl('', [Validators.required]),
      description:new FormControl('', [Validators.required])
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.Reconnection.controls;
  }
  ReconnectionRequest() {
    // request part
    let newDate = new Date();
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null

    let dataObj = {
      connectionID: this.data.id,
      requestType:"Extra TV",
      description: this.Reconnection.value.description,
      phone: this.Reconnection.value.phoneNumber,
      createdBy: adminId,
      "createdAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),
      subject:"Extra TV",
    };
    // if (dataObj.description == "" || dataObj.phone == ""
    // ) {
    //   this.isEmpty();
    // } 
    if(!this.Reconnection.valid){
      this.submitted = true;
      return
    }
    else {
      this.dataServise.postValue('request', dataObj).subscribe(
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
        }
      );
    }
  }


  showSuccess() {
    this.toastr.success('Sucessfully created !', 'successful');
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
