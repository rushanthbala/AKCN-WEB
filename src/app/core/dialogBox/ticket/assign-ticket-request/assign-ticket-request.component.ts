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
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-assign-ticket-request',
  templateUrl: './assign-ticket-request.component.html',
  styleUrls: ['./assign-ticket-request.component.scss'],
})
export class AssignTicketRequestDilogComponent implements OnInit {
  public loading: Boolean = false;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];
  public AdminId: any;
  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianName: any = 'Technician';
  public TechnicianId: any;
  suburl2: string = 'area';
  suburl1: string = 'employee';
  submitted = false;

  public selectedDeviceObj: any = {};
  public storedToken: any = localStorage.getItem('auth');
  currentUser: any;
  onChangeObj(newObj: any) {
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    this.chackRequest.tech = newObj.firstName;
  }

  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    setTimeout(() => {
      this.getAll();
    });
  }
  constructor(
    public dialogRef: MatDialogRef<AssignTicketRequestDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {
    this.AdminId = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.chackRequest = this.fb.group({
      tech: new FormControl(null, [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }
  assignYTicket() {
    let newDate = new Date().toLocaleString("en-US", { timeZone: "Europe/London" });
   const auth: any = localStorage.getItem('auht');
   this.currentUser = JSON.parse(auth);

    let dataObj = {
      updatedBy: this.currentUser?.firstName,
      updatedAt: formatDate(newDate, 'yyyy-MM-dd hh:mm', 'en-US'),
      assignedTo: this.TechnicianName,
      assignedToID: this.TechnicianId,
    };
    if (dataObj.assignedTo == 'Technician') {
      this.submitted = true;
      return;
    } else {
      this.loading = true;
      this.dataServise
        .putValue(`ticket/assign/${this.data.TicketData.id}`, dataObj)
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
    this.dataServise.getData(`${this.suburl1}`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.TechnicianId = val.id;
  }
  showSuccess() {
    this.toastr.success('Sucessfully Assigned', 'Sucessfully');
    this.onNoClick();
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
