import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-reconnect-dialog',
  templateUrl: './reconnect-dialog.component.html',
  styleUrls: ['./reconnect-dialog.component.scss']
})
export class ReconnectDialogComponent implements OnInit {

  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public  TechnicianId: any = 'Technician';
  suburl2: string = "area"
  suburl1: string = "road"


  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<ReconnectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,

  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.chackRequest = this.fb.group({
      disconnectedDate: '',
      remarks: ''
    });
  }
  ReconnectionRequest() {
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null
    this.loading = true;

    this.loading = true;
    console.log(this.chackRequest.value);
    let data = {
      actionDate: this.chackRequest.value.disconnectedDate,
      remarks:this.chackRequest.value.remarks,
      enteredBy:this.TechnicianId,
      conductdBy:adminId,
      connectionID:this.data.id,
    };
    if (data.actionDate == "" || data.remarks == "" ||
      this.TechnicianId == "Technician" 
    ) {
      this.isEmpty();
      this.loading = false;

    } else {
      this.dataServise.putValue(`connection/status/deactivate/${this.data.connectionID}`, data).subscribe(
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

  getAll() {
    // get TechnicianArray
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.TechnicianId = val
  }
  showSuccess() {
    this.toastr.success('Sucessfully Disconnected', 'Sucessfully');
    window.location.reload()

  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
