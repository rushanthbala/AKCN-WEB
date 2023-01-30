import { ThisReceiver } from '@angular/compiler';
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
  selector: 'app-user-dialog',
  templateUrl: './road-dialog.component.html',
  styleUrls: ['./road-dialog.component.scss'],
})
export class RoadDialogComponent implements OnInit {
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
  submitted = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.getAll();
    });

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
    }
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<RoadDialogComponent>,
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
      road: this.ifData
        ? this.currentData.road
        : new FormControl('', [Validators.required]),
      area: this.ifData
        ? this.currentData.areaID
        : new FormControl(null, [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }

  ReconnectionRequest() {
    this.submitted = true;
    let datas = {
      road: this.chackRequest.value.road,
      area: this.chackRequest.value.area,
    };
    let sendObj = {
      road: datas.road,
      areaID: datas.area,
    };

    if (!this.chackRequest.valid) {
      // this.isEmpty();

      return;
    } else {
      this.loading = true;
      if (this.data.sendtype == 'POST') {
        this.postMethod(sendObj);
      } else {
        this.putMethod(sendObj);
      }
    }
  }

  postMethod(sendObj: any) {
    this.dataServise.postValue(`road`, sendObj).subscribe(
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
  putMethod(sendObj: any) {
    this.dataServise.putValue(`road/${this.currentData.id}`, sendObj).subscribe(
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
    // this.dataServise.getData(`employee`).subscribe((res) => {
    //   this.TechnicianArray = res;
    // });
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
    });
    // this.dataServise.getData(`road`).subscribe((res) => {
    //   this.roadArray = res;
    // });
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
    this.toastr.error('Fill All The Field', 'Error');
  }
}
