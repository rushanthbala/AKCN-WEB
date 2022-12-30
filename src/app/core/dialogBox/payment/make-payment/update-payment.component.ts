import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit {

  public loading: Boolean = true;
  public areaArray: any = [];
  public roadArray: any = [];
  public TechnicianArray: any = [];
  public PaymentArray: any = [
    {
    id:1,
    value:'MONTHLY PAYMENT'
  }, {
    id:2,
    value:'FINE'
  },
];

  public roadId: any = 'Road';
  public areaId: any = 'Area';
  public  TechnicianId: any = 'Technician';
  public  PaymentType: any = '';
  suburl2: string = "area"
  suburl1: string = "road"


  chackRequest: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
    // this.getAll()
  }
  constructor(
    public dialogRef: MatDialogRef<UpdatePaymentComponent>,
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
      amount: '',
      description: ''
    });
  }
  ReconnectionRequest() {
    let todayDate =new Date()
    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null
  
    let dataObj ={
      connectionID:this.data.id,
      paidDateTime:formatDate(todayDate, 'yyyy-MM-dd', "en-US"),
      description: this.chackRequest.value.description,
      paymentType:this.PaymentType,
      amount:this.chackRequest.value.amount,
      enteredBy:"ADMIN",
      conductedBy:adminId,
      phoneNo:this.data.primaryPhone
    }
    console.log(dataObj,"dataObj");

    if (dataObj.amount == "" || dataObj.description == "" ||dataObj.paymentType == ""
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('payment', dataObj).subscribe(
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
    // get TechnicianArray
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
    });
  }

  onSelect(val: any) {
    this.PaymentType = val
  }
  showSuccess() {
    this.toastr.success('Sucessfully Finished', 'Sucessfully');
    window.location.reload()

  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
