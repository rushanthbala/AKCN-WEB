import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.scss'],
})
export class PaymentUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{
    connectionId: any;
    amount: any;
    arreardate: any;
    loginForm: any
  }>();
  errmsg = '';
  sucmsg = '';
  loading = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  loginForm: FormGroup | any;
  submitted = false;

  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      connectionId: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      arreardate: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  searching() {}
  emitEvent() {
    this.loading = true;

    let connectionId = this.loginForm.value.connectionId;
    let amount = this.loginForm.value.amount;
    let arreardate = this.loginForm.value.arreardate;

    if (!this.loginForm.valid) {
      // this.isEmpty();
      this.submitted = true;
      this.loading = false;
      return;
    } else {
      this.OnClick.emit({
        connectionId: connectionId,
        amount: amount,
        arreardate: arreardate,
        loginForm: this.loginForm
      });

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
    this.toastr.error('Fill All The Field', 'Error');
  }
}
