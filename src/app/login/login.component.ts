import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../servise/login/login.service';
import { ToastrService } from 'ngx-toastr';

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dataServise: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  loginForm: FormGroup | any;
  errmsg = '';
  sucmsg = '';
  loading = false;
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }
  login() {
    this.loading = true;
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      phone:"077123456"
    };
    if (data.email == "" || data.password == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.dataServise.postValue('admin/login', data).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.errmsg = res.message || 'These credentials do not match !!.';
            this.loading = false;
          } else {
            localStorage.setItem('auth', JSON.stringify(res.message));
            this.sucmsg = res.message || 'sucessfull !!.';
            this.showSuccess()
            this.loading = false;
            this.router.navigate(['auth/dashboard/']);
          }
        },
        (e) => {
          this.loading = false;
        }
      );
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
