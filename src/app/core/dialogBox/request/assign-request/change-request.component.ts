import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-pending-change-request',
  templateUrl: './change-request.component.html',
  styleUrls: ['./change-request.component.scss']
})
export class PendingChangeRequestComponent implements OnInit {

  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  suburl2: string = "area"
  suburl1: string = "employee"
  public TechnicianName: any = 'Technician';;
  public TechnicianId: any;
  public selectedDeviceObj: any = {}
  public storedToken: any = localStorage.getItem('auth');
  submitted = false;
  onChangeObj(newObj: any) {
    console.log(newObj, 'ss')
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    this.chackRequest.tech =newObj.firstName;
    console.log( this.chackRequest.tech," this.chackRequest.tech");
    
    // ... do other stuff here ...
  }

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<PendingChangeRequestComponent>,
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
      tech: new FormControl('', [Validators.required])
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }
  ReconnectionRequest() {

    let newDate = new Date();
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null

    let dataObj = {
      "updatedBy": adminId,
      "updatedAt": formatDate(newDate, 'yyyy-MM-dd', "en-US"),
      "assignedTo": this.TechnicianName,
      "assignedToID": this.TechnicianId,
    };
    if (dataObj.assignedTo == "Technician"
    ) {
      // this.isEmpty();
      this.submitted = true;
      return
    } 
    // if(!this.chackRequest.valid){
    //   this.submitted = true;
    //   return
    // }
    else {
      this.loading = true
      this.dataServise.putValue(`request/assign/${this.data.TicketData.id}`, dataObj).subscribe(
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
  }

  getAll() {
    // get TechnicianArray
    this.dataServise.getData(`${this.suburl1}`).subscribe((res) => {
      this.TechnicianArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
  }

  showSuccess() {
    this.toastr.success('Sucessfully Assigned', 'Sucessfully');
    this.onNoClick()
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
