import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.scss'],
})
export class AreaDialogComponent implements OnInit {
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
  branchArray: any;
  submitted = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.getAll();
    });
    if (this.data.sendtype == 'POST') {
      this.ifData = false;
    } else if (
      this.data.sendtype == 'PUT' &&
      this.data.subscriberdata != '{}'
    ) {
      this.ifData = true;
      this.currentData = this.data.subscriberdata;
    } else {
    }
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<AreaDialogComponent>,
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
      area: this.ifData
        ? this.currentData.area
        : new FormControl('', [Validators.required]),
      rental: this.ifData
        ? this.currentData.rental
        : new FormControl('', [Validators.required]),
      branch: this.ifData
        ? this.currentData.branchID
        : new FormControl(null, [Validators.required]),
      areaCode: this.ifData
        ? this.currentData.areaCode
        : new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
          ]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }
  ReconnectionRequest() {
    let datas = {
      area: this.chackRequest.value.area,
      rental: this.chackRequest.value.rental,
      branch: this.chackRequest.value.branch,
      areaCode: this.chackRequest.value.areaCode,
    };
    let sendObj = {
      area: datas.area,
      rental: datas.rental,
      branchID: datas.branch,
      areaCode: datas.areaCode,
    };

    if (!this.chackRequest.valid) {
      this.submitted = true;
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
    this.dataServise.postValue(`area`, sendObj).subscribe(
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
    this.dataServise.putValue(`area/${this.currentData.id}`, sendObj).subscribe(
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
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.branchArray = res;
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
    this.toastr.error('Please recheck your details', 'Error');
  }
  showMsg() {
    this.toastr.error('Area Code must be in 3 letters', 'Error');
  }
}
