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
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  suburl2: string = 'area';
  suburl1: string = 'road';

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    setTimeout(() => {
      this.getAll();
    });
  }
  constructor(
    public dialogRef: MatDialogRef<NoDataComponent>,
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
      // phoneNumber: '',
      // address: ''
    });
  }
  ReconnectionRequest() {
    let data = {
      phoneNumber: this.chackRequest.value.phoneNumber,
      address: this.chackRequest.value.address,
      roadId: this.roadId,
      areaId: this.areaId,
    };
    if (
      this.chackRequest.value.phoneNumber == '' ||
      this.chackRequest.value.address == '' ||
      this.roadId == 'Road' ||
      this.areaId == 'Area'
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('admin/login', data).subscribe(
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
        }
      );
    }
  }

  getAll() {
    this.dataServise.getData(`${this.suburl1}`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.TechnicianId = val;
  }
  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
