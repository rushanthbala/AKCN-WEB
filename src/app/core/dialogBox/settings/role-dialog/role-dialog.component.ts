import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss'],
})
export class RoleDialogComponent implements OnInit {
  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  public ifData: boolean = false;
  suburl2: string = 'area';
  suburl1: string = 'road';
  public currentData: any = {};

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.getAll();
    console.log(this.data, 'dtaaaa');
    if (this.data.sendtype == 'POST') {
      // alert("cool")
      this.ifData = false;
    } else if (
      this.data.sendtype == 'PUT' &&
      this.data.subscriberdata != '{}'
    ) {
      this.ifData = true;
      this.currentData = this.data.subscriberdata;
      // alert("oko")
    } else {
      // console.log(this.data.sendtype=="PUT" &&this.data.subscriberdata,this.data.sendtype ,this.data.subscriberdata);
    }
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    console.log(this.data, 'his.data');

    this.chackRequest = this.fb.group({
      role: this.ifData ? this.currentData.role : '',
      // lastName: this.ifData ?this.currentData.lastName: "",
    });
  }
  ReconnectionRequest() {
    console.log(this.chackRequest.value);
    let datas = {
      role: this.chackRequest.value.role,
      id:this.chackRequest.value.id
    };
    let sendObj = {
      "role": datas.role,
      "id":datas.id
    };

    if (datas.role == '') {
      this.isEmpty();
    }else{
      this.loading = true
      if(this.data.sendtype == 'POST'){
        this.postMethod(sendObj)
      } else{
        this.putMethod(sendObj)
      }
    }
  }

  postMethod(sendObj: any){
    console.log("post");
    this.dataServise.postValue(`userrole`, sendObj).subscribe(
      (res: any) => {
        if (res.errorMessage) {
          this.loading = false;
        } else {
          this.showSuccessAdd();
          this.loading = false;
        }
      },
      (e) => {
        this.loading = false;
        this.showError();
      }
    );
  }

  putMethod(sendObj:any){
    this.dataServise.putValue(`userrole/${this.currentData.id}`, sendObj).subscribe(
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
        this.showError();
      }
    );
  }

  getAll() {
    // get TechnicianArray
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
    });
  }

  onSelect(val: any) {
    this.roadId = val;
  }
  onSelectTech(val: any) {
    this.TechnicianId = val;
  }
  onSelectarea(val: any) {
    this.areaId = val;
  }
  showSuccess() {
    this.toastr.success('Sucessfully Edited', 'Sucessfully');
    window.location.reload();
  }
  showSuccessAdd() {
    this.toastr.success('Sucessfully Added', 'Sucessfully');
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
