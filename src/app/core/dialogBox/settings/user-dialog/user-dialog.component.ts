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
import Validation from 'src/Validation/password.validation';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserPostPut implements OnInit {
  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public branchArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  public ifData: boolean = false;
  suburl2: string = 'area';
  suburl1: string = 'road';
  public currentData: any = {};

  chackRequest: FormGroup | any;
  id: any;
  roleArray: any;
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
    public dialogRef: MatDialogRef<UserPostPut>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {

    this.chackRequest = this.fb.group(
      {
        firstName: this.ifData
          ? this.currentData.firstName
          : new FormControl('', [Validators.required]),
        lastName: this.ifData
          ? this.currentData.lastName
          : new FormControl('', [Validators.required]),
        email: this.ifData
          ? this.currentData.email
          : new FormControl('', [Validators.required, Validators.email]),
        primaryPhone: this.ifData
          ? this.currentData.primaryPhone
          : new FormControl('', [Validators.required]),
        password: '',
        role: this.ifData
          ? this.currentData.roleID
          : new FormControl(null, [Validators.required]),
        cpassword: '',
        branch: this.ifData
          ? this.currentData.branchID
          : new FormControl(null, [Validators.required]),
      },
      {
        validators: [Validation.match('password', 'cpassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }

  ReconnectionRequest() {
    this.submitted = true;
    let datas = {
      firstName: this.chackRequest.value.firstName,
      lastName: this.chackRequest.value.lastName,
      role: this.chackRequest.value.role,
      branch: this.chackRequest.value.branch,
      email: this.chackRequest.value.email,
      primaryPhone: this.chackRequest.value.primaryPhone,
      password: this.chackRequest.value.password,
    };
    let sendObj = {
      firstName: datas.firstName,
      lastName: datas.lastName,
      password: datas.password,
      email: datas.email,
      primaryPhone: datas.primaryPhone,
      roleID: datas.role,
      branchID: datas.branch,
      ppVerified: '1',
      status: '1',
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
    this.dataServise.postValue(`auth/employee/register`, sendObj).subscribe(
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
    this.dataServise
      .putValue(`employee/${this.currentData.id}`, sendObj)
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

  getAll() {
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.branchArray = res;
    });
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
    });
    this.dataServise.getData(`userrole`).subscribe((res) => {
      this.roleArray = res;
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
    this.toastr.error('Fill All The Field', 'Error');
  }
}
