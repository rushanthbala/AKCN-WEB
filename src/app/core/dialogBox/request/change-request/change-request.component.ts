import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.scss']
})
export class ChangeRequestComponent implements OnInit {

  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public roadId: any = 'Road';
  public areaId: any = 'Area';
  suburl2: string = "area"
  suburl1: string = "road"


  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<ChangeRequestComponent>,
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
      phoneNumber: '',
      address: ''
    });
  }
  ReconnectionRequest() {
    console.log(this.chackRequest.value);
    let data = {
      phoneNumber: this.chackRequest.value.phoneNumber,
      address: this.chackRequest.value.address,
      roadId:this.roadId,
      areaId:this.areaId,
      "requestType": "Change Request",
      connectionID:this.data.id
    };
    if (this.chackRequest.value.phoneNumber == "" || this.chackRequest.value.address == "" ||
      this.roadId == "Road" || this.areaId == "Area"
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('request', data).subscribe(
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
    // get roadArray
    this.dataServise.getData(`${this.suburl1}`).subscribe((res) => {
      this.roadArray = res;
    });
    // areaArray
    this.dataServise.getData(`${this.suburl2}`).subscribe((res) => {
      this.areaArray = res;
    });
    console.log(this.roadArray, this.areaArray);

  }

  onSelect(val: any) {
    this.roadId = val
  }
  onSelectarea(val: any) {
    this.areaId = val
  }

  showSuccess() {
    this.toastr.success('Sucessfully Changed', 'Sucessfully');
    window.location.reload()
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
