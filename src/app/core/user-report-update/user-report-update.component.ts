import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-report-update',
  templateUrl: './user-report-update.component.html',
  styleUrls: ['./user-report-update.component.scss']
})
export class UserReportUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ user: any, fromdate: any, todate: any }>()
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
      user: "",
      fromdate: "",
      todate: "",
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let user = this.loginForm.value.user;
    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    if (user == "" || fromdate == "" || todate == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ user: user, fromdate: fromdate, todate: todate })

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
