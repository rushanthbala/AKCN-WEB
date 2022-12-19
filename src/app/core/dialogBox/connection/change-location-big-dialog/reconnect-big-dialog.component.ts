import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-reconnect-big-dialog',
  templateUrl: './reconnect-big-dialog.component.html',
  styleUrls: ['./reconnect-big-dialog.component.scss']
})
export class ReconnectBigDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<ReconnectBigDialogComponent>,
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
      reconnectionFee: '',
      newAddress:""
    });
  }
  ReconnectionRequest() {
    console.log(this.chackRequest.value);
    let datas = {
      disconnectedDate: this.chackRequest.value.disconnectedDate,
      reconnectionFee: this.chackRequest.value.reconnectionFee,
      TechnicianId:this.TechnicianId  ,
      roadId:this.roadId,
      areaId:this.areaId,
      newAddress:this.chackRequest.value.newAddress,
    };
    let dataObj = {
      connectionType: this.data.type,
      tvCount: this.data.TV,
      oldID: this.data.OldID,
      areaCode: this.areaId,
      roadID: this.roadId,
      technicianId:this.TechnicianId,
      connectionAddress: this.data.ConnectionAddress,
      dueAmount: datas.reconnectionFee,
      ConnectionFee: this.data.ConnectionFee,
      roadId:1,
      customerID:this.data.customerID,
      "status":"Active", 
      "connectedDate": datas.disconnectedDate,
      "connectionStatus":"ACTIVE", 
      "actionDate" :  datas.disconnectedDate,
      branchID:this.data.branchId
    }
    let locationAddress ={
      "connectionLocation":datas.newAddress

    }
    console.log(datas,"data");
    console.log(datas.disconnectedDate == "" ,datas.reconnectionFee == "" ,
    datas.TechnicianId == "Technician" ,datas.newAddress=="",   datas.roadId == "Road" ,  datas.areaId == "Area"
 );
    
    if (datas.disconnectedDate == "" ||datas.reconnectionFee == "" ||
    datas.TechnicianId == "Technician" ||datas.newAddress==""||   datas.roadId == "Road" ||  datas.areaId == "Area"
    ) {
      this.isEmpty();
    } else {
      // connection/location/JAF00012
      this.loading = true
      this.dataServise.putValue(`connection/location/${this.data.connectionID}`, dataObj).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            this.dataServise.putValue(`connection/${this.data.connectionID}`, locationAddress).subscribe(
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
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
    });
  }

  onSelect(val: any) {
    this.roadId = val
  }
  onSelectTech(val: any) {
    this.TechnicianId = val
  }
  onSelectarea(val: any) {
    this.areaId = val
  }
  showSuccess() {
    this.toastr.success('Sucessfully Changed', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
