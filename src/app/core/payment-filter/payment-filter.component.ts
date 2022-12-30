import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.scss']
})
export class PaymentFilterComponent {
  @Output() OnClick = new EventEmitter<{ searchinginput: string }>()
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
      searchinginput: ''
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let sInput = this.loginForm.value.searchinginput;
    if (sInput == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ searchinginput: sInput })

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
