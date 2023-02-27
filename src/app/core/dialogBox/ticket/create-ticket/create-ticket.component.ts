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
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponentDialog implements OnInit {
  public loading: Boolean = true;
  public subjectArray: any = [
    {
      id: 'UNCLEAR',
      value: 'UNCLEAR',
    },
    {
      id: 'NOT WORKING',
      value: 'NOT WORKING',
    },
    {
      id: 'WIRE DAMANGE',
      value: 'WIRE DAMANGE',
    },
    {
      id: 'ELECTRIC SHOCK',
      value: 'ELECTRIC SHOCK',
    },
    {
      id: 'OTHER',
      value: 'OTHER',
    },
  ];
  public roadArray: any = [];
  public subject: any = 'Subject';
  public areaId: any = 'Area';
  suburl2: string = 'area';
  suburl1: string = 'road';

  chackRequest: FormGroup | any;
  submitted = false;
  currentUser: any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    const Auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(Auth);
  }
  constructor(
    public dialogRef: MatDialogRef<CreateTicketComponentDialog>,
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
      subject: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }

  ReconnectionRequest() {
    // let newDate = new Date();
    const date = new Date().toLocaleString("en-US", { timeZone: "Europe/London" });
    let dataObj = {
      description: this.chackRequest.value.description,
      phone: this.chackRequest.value.phoneNumber,
      subject: this.subject,
      connectionID: this.data.id,
      createdBy: this.currentUser.firstName,
      createdAt: formatDate(date, 'yyyy-MM-dd HH:mm', 'en-US'),
    };
    if (!this.chackRequest.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataServise.postValue('ticket', dataObj).subscribe(
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

  onSelectSubject(val: any) {
    this.subject = val;
  }

  showSuccess() {
    this.toastr.success('Sucessfully created !', 'successful');
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
