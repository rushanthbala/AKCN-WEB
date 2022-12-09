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

  public loading: Boolean = true;
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
      reconnectionFee: ''
    });
  }
  ReconnectionRequest() {
    console.log(this.chackRequest.value);
    let data = {
      disconnectedDate: this.chackRequest.value.disconnectedDate,
      reconnectionFee: this.chackRequest.value.reconnectionFee,
      TechnicianId:this.TechnicianId  
      // roadId:this.roadId,
      // areaId:this.areaId
    };
    if (this.chackRequest.value.disconnectedDate == "" || this.chackRequest.value.reconnectionFee == "" ||
      this.TechnicianId == "Technician" 
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('admin/login', data).subscribe(
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

  getAll() {
    // get TechnicianArray
    alert(1)
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.TechnicianId = val
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
