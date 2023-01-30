import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-edit-connection-dialog',
  templateUrl: './edit-connection-dialog.component.html',
  styleUrls: ['./edit-connection-dialog.component.scss']
})
export class EditConnectionDialogComponent implements OnInit {

  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];
  public branchArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public branchId :any ="Branch"
  public  TechnicianId: any = 'Technician';
  suburl2: string = "area"
  suburl1: string = "road"
  areaCodeName =""
  roadIDName=""
  branchIDName=""


  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    setTimeout(() => {
      this.getAll()
    })
  }
  constructor(
    public dialogRef: MatDialogRef<EditConnectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,

  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    let todayDate = new Date()

    this.chackRequest = this.fb.group({
      type:this.data.connectionType,
      oldId: this.data.oldID,
      NoOfTV:  this.data.tvCount,
      houseNo: this.data.connectionAddress,
      connectdDate:formatDate(todayDate, 'yyyy-MM-dd', "en-US"),
    });
  }
  ReconnectionRequest() {
    let todayDate = new Date()
    let dataSet = {
      branchID:this.branchId,
      roadID:this.roadId,
      areaCode:this.areaId,
      connectionAddress:this.chackRequest.value.houseNo,
      connectionID:this.data.id,
      oldID: this.chackRequest.value.oldId,
      status:"Active",
      connectedDate: formatDate(todayDate, 'yyyy-MM-dd', "en-US"),
      connectionStatus:"Active",
      conectionType:this.chackRequest.value.type,
      tvCount: this.chackRequest.value.NoOfTV,
      actionDate: formatDate(todayDate, 'yyyy-MM-dd', "en-US"),
    };
    
    if (dataSet.oldID == "" ||dataSet.tvCount == "" ||
    dataSet.connectionAddress==""||   dataSet.roadID == "Road" ||  dataSet.areaCode == "Area" ||  dataSet.branchID == "Branch"
    ) {
      this.isEmpty();
    } else {
      this.dataServise.putValue(`connection/${this.data.connectionID}`, dataSet).subscribe(
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
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
      res.map((item:any)=>{
        if(item.id==this.data.areaCode){
          this.areaCodeName=item.area
          this.areaId = item.id
        }
        
      })
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
      res.map((item:any)=>{
        if(item.id==this.data.roadID){
          this.roadIDName=item.road
          this.roadId = item.id
        }
        
      })
    });
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.branchArray = res;
      res.map((item:any)=>{
        if(item.id==this.data.branchID){
          this.branchIDName=item.branchName
          this.branchId = item.id
        }
        
      })
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
  onSelectbranch(val: any) {
    
    this.branchId = val
  }
  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
    window.location.reload()

  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
