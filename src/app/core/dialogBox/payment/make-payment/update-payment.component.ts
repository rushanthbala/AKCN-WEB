import { formatDate } from '@angular/common';
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
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss'],
})
export class UpdatePaymentComponent implements OnInit {
  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];
  public PaymentArray: any = [
    {
      id: 1,
      value: 'MONTHLY PAYMENT',
    },
    {
      id: 2,
      value: 'FINE',
    },
    {
      id: 3,
      value: 'RENTAL',
    },
    {
      id: 4,
      value: 'ARREARS',
    },
    {
      id: 5,
      value: 'DISCOUNT',
    },
    {
      id: 6,
      value: 'RECONNECTION',
    },
    {
      id: 7,
      value: 'NEW CONNECTION',
    },
    {
      id: 8,
      value: 'DISCONNECT',
    },
    {
      id: 9,
      value: 'EXTRA TV',
    },
    {
      id: 10,
      value: 'CHANGE LOCATION',
    },
  ];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  public PaymentType: any = '';
  suburl2: string = 'area';
  suburl1: string = 'road';

  chackRequest: FormGroup | any;
  submitted = false;
  currentUser: any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    // this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<UpdatePaymentComponent>,
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
      payment: new FormControl(null, [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.chackRequest.controls;
  }
  ReconnectionRequest() {
    let todayDate = new Date();
    const auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(auth);

    let dataObj = {
      connectionID: this.data.id,
      paidDateTime: formatDate(todayDate, 'yyyy-MM-dd', 'en-US'),
      description: this.chackRequest.value.description,
      paymentType: this.PaymentType,
      amount: this.chackRequest.value.amount,
      enteredBy: this.currentUser.firstName,
      conductedBy:  this.currentUser.firstName,
      phoneNo: this.data.primaryPhone,
    };
    if (!this.chackRequest.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataServise.postValue('payment', dataObj).subscribe(
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
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.PaymentType = val;
  }
  showSuccess() {
    this.toastr.success('Sucessfully Finished', 'Sucessfully');
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
