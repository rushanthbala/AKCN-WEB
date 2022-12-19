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

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public  TechnicianId: any = 'Technician';
  suburl2: string = "area"
  suburl1: string = "road"
  areaCodeName =""
  roadIDName=""


  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    this.getAll()
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
    this.chackRequest = this.fb.group({
      type:this.data.connectionType,
      oldId: this.data.oldID,
      NoOfTV:  this.data.tvCount,
      houseNo: this.data.connectionAddress,
    });
  }
  ReconnectionRequest() {
    // console.log(this.chackRequest.value);
    let dataSet = {
      oldId: this.chackRequest.value.oldId,
      NoOfTV: this.chackRequest.value.NoOfTV,
      TechnicianId:this.TechnicianId  ,
      roadId:this.roadId,
      areaId:this.areaId,
      houseNo:this.chackRequest.value.houseNo,
    };
    console.log(dataSet,"dataSet");
    console.log(dataSet.oldId == "" ,dataSet.NoOfTV == "" ,
    dataSet.houseNo=="",   dataSet.roadId == "Road" ,  dataSet.areaId == "Area"
 );
    console.log(dataSet,"dataSet");
    
    if (dataSet.oldId == "" ||dataSet.NoOfTV == "" ||
    dataSet.houseNo==""||   dataSet.roadId == "Road" ||  dataSet.areaId == "Area"
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('admin/login', dataSet).subscribe(
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
          this.areaId = item.area
        }
        
      })
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
      res.map((item:any)=>{
        if(item.id==this.data.roadID){
          this.roadIDName=item.road
          this.roadId = item.road
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
