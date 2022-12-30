import { formatDate } from '@angular/common';
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
  selector: 'app-adjust-payment-update',
  templateUrl: './adjust-payment-update.component.html',
  styleUrls: ['./adjust-payment-update.component.scss'],
})
export class AdjustPaymentUpdateComponent {
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
  ];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public TechnicianId: any = 'Technician';
  public PaymentType: any = '';
  suburl2: string = 'area';
  suburl1: string = 'road';
  public currentData: any = {};
  public ifData: boolean = false;

  chackRequest: FormGroup | any;
  ngOnInit(): void {
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
      // console.log(this.data.sendtype=="PUT" &&this.data.subscriberdata,this.data.sendtype ,this.data.subscriberdata);
    }
    this.initialReconnectionForm();
    // this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<AdjustPaymentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService
  ) {}


  initialReconnectionForm() {
    this.chackRequest = this.fb.group({
      paidDateTime: this.ifData? this.currentData.paidDateTime : '',
      paymentType : this.ifData? this.currentData.paymentType: '',
      amount: this.ifData? this.currentData.amount: '',
      description: this.ifData? this.currentData.description: '',
    });
  }

  ReconnectionRequest() {
    let datas = {
      paidDateTime: this.chackRequest.value.paidDateTime,
      paymentType: this.chackRequest.value.paymentType,
      amount: this.chackRequest.value.amount,
      description: this.chackRequest.value.description,
    }

    let dataObj = {
      paidDateTime: datas.paidDateTime,
      paymentType: datas.paymentType,
      amount: datas.amount,
      description: datas.description
    }

    console.log(dataObj, 'dataObj');

    if (
      dataObj.amount == '' ||
      dataObj.description == '' ||
      dataObj.paymentType == ''
    ) {
      this.isEmpty();
    } else {
      this.dataServise
        .putValue(`payment/updatepayment/${this.currentData.invoiceID}`, dataObj)
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
          }
        );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAll() {
    // get TechnicianArray
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.PaymentType = val;
  }
  showSuccess() {
    this.toastr.success('Sucessfully Updated', 'Sucessfully');
    window.location.reload()
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
