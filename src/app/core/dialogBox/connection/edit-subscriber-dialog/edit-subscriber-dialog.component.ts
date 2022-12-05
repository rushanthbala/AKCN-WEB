import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-edit-subscriber-dialog',
  templateUrl: './edit-subscriber-dialog.component.html',
  styleUrls: ['./edit-subscriber-dialog.component.scss']
})
export class EditSubscriberDialogComponent implements OnInit {

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
    // this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<EditSubscriberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,

  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    console.log(this.data,"his.data");
    
    this.chackRequest = this.fb.group({
      NIC:this.data.subscriberNIC ?this.data.subscriberNIC: "check",
      firstName: this.data.firstName ?this.data.firstName: "",
      lastName: this.data.lastName ?this.data.lastName: "",
      primaryNo:this.data.primaryPhone ?this.data.primaryPhone: "",
      email:this.data.email ?this.data.email: "",
      secoundaryNo:this.data.secondaryPhone ?this.data.secondaryPhone: "",
    });
  }
  ReconnectionRequest() {
    console.log(this.chackRequest.value);
    let datas = {
      NIC: this.chackRequest.value.NIC,

      firstName: this.chackRequest.value.firstName,
      lastName: this.chackRequest.value.lastName,
      email:this.chackRequest.value.email,
      secoundaryNo:this.chackRequest.value.secoundaryNo,
      primaryNo:this.chackRequest.value.primaryNo,
    };
    console.log(datas,"datas");
    console.log(datas.firstName == "" ,datas.lastName == "" ,
    datas.primaryNo=="",   datas.secoundaryNo == "Road" ,  datas.NIC == "Area",datas.email == "" 
 );
    
    if (datas.firstName == "" ||datas.lastName == "" ||
    datas.primaryNo==""||   datas.secoundaryNo == "Road" ||  datas.NIC == "Area" ||datas.email == "" 
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('admin/login', datas).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            localStorage.setItem('auth', JSON.stringify(res.message));
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
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
