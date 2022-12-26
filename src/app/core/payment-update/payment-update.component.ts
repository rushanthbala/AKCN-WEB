import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.scss']
})
export class PaymentUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ connectionId: any, amount: any, arreardate: any }>()
  errmsg = '';
  sucmsg = '';
  loading = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
  ) { }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();

  }
  initialForm() {
    this.loginForm = this.fb.group({
      connectionId: "",
      amount: "",
      arreardate: "",
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let connectionId = this.loginForm.value.connectionId;
    let amount = this.loginForm.value.amount;
    let arreardate = this.loginForm.value.arreardate;

    if (connectionId == "" || amount == "" || arreardate == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ connectionId: connectionId, amount: amount, arreardate: arreardate })

      this.loading = false;
    }
  }
  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
