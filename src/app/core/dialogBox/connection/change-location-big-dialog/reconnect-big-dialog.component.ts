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
  selector: 'app-reconnect-big-dialog',
  templateUrl: './reconnect-big-dialog.component.html',
  styleUrls: ['./reconnect-big-dialog.component.scss'],
})
export class ReconnectBigDialogComponent implements OnInit {
  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  suburl2: string = 'area';
  suburl1: string = 'road';
  areaCodeName = '';
  roadIDName = '';
  submitted = false;

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    setTimeout(() => {
      this.getAll();
    });
  }
  constructor(
    public dialogRef: MatDialogRef<ReconnectBigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.chackRequest = this.fb.group({
      disconnectedDate: new FormControl('', [Validators.required]),
      reconnectionFee: new FormControl('', [Validators.required]),
      newAddress: new FormControl('', [Validators.required]),
      tech: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      road: new FormControl(null, [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }
  ReconnectionRequest() {
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null;

    let dataObj = {
      areaCode: this.areaId,
      roadID: this.roadId,
      connectionAddress: this.data.ConnectionAddress,
      dueAmount: this.chackRequest.value.reconnectionFee,
      actionDate: this.chackRequest.value.disconnectedDate,
      connectionID: this.data.id,
      description: 'sample,',
      enteredBy: this.TechnicianId,
      conductdBy: adminId,
    };
    // let locationAddress ={
    //   "connectionLocation":this.chackRequest.value.newAddress

    // }
    //     datas.TechnicianId == "Technician" ,datas.newAddress=="",   datas.roadId == "Road" ,  datas.areaId == "Area"
    //  );

    // if (dataObj.areaCode == "Area" ||dataObj.roadID == "Road" ||
    // dataObj.connectionAddress == "" ||dataObj.dueAmount==""||   dataObj.actionDate == "" ||  dataObj.connectionID == ""
    // ) {
    //   this.isEmpty();
    // }
    if (!this.chackRequest.valid) {
      this.submitted = true;
      return;
    } else {
      // connection/location/JAF00012
      this.loading = true;
      this.dataServise
        .putValue(`connection/address/${this.data.id}`, dataObj)
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
            this.showError();
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
      res.map((item: any) => {
        if (item.id == this.data.areaCode) {
          this.areaCodeName = item.area;
          this.areaId = item.id;
        }
      });
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
      res.map((item: any) => {
        if (item.id == this.data.roadID) {
          this.roadIDName = item.road;
          this.roadId = item.id;
        }
      });
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
    this.toastr.success('Sucessfully Changed', 'Sucessfully');
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
