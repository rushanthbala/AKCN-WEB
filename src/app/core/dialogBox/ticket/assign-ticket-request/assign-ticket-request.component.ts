import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-assign-ticket-request',
  templateUrl: './assign-ticket-request.component.html',
  styleUrls: ['./assign-ticket-request.component.scss']
})
export class AssignTicketRequestDilogComponent implements OnInit {
  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];
  public AdminId: any
  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianName: any = 'Technician';;
  public TechnicianId: any;
  suburl2: string = "area"
  suburl1: string = "employee"

  public selectedDeviceObj: any = {}
  public storedToken: any = localStorage.getItem('auth');
  onChangeObj(newObj: any) {
    console.log(newObj.firstName);
    console.log(newObj.id);
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    // ... do other stuff here ...
  }

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    console.log(this.storedToken, "this.storedToken");

    this.initialReconnectionForm();
    this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<AssignTicketRequestDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,
  ) {
    this.AdminId = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.chackRequest = this.fb.group({
      phoneNumber: '',
      address: ''
    });
  }
  assignYTicket() {

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
      console.log(dataObj,"dataObj");
      
      this.isEmpty();
    } else {
      this.loading =true
      this.dataServise.putValue(`ticket/assign/${this.data.TicketData.id}`, dataObj).subscribe(
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
      if(res.length >0){
        this.TechnicianName=res[0].firstName
        this.TechnicianId=res[0].id
      }
    });
  }

  onSelect(val: any) {
    this.TechnicianId = val.id
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
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
