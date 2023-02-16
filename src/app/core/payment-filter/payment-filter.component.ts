import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.scss'],
})
export class PaymentFilterComponent {
  @Output() OnClick = new EventEmitter<{ searchinginput: string }>();
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
      searchinginput: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  emitEvent() {
    this.loading = true;

    let sInput = this.loginForm.value.searchinginput;
    if (!this.loginForm.valid) {
      this.submitted = true;
      this.loading = false;
      return;
    } else {
      this.OnClick.emit({ searchinginput: sInput });

      this.loading = false;
    }
  }
}
