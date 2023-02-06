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
import { StorageServiceService } from '../servise/storageService/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn= false;
  constructor(
    private fb: FormBuilder,
    public dataServise: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private storageService: StorageServiceService
  ) { }
  loginForm: FormGroup | any;
  errmsg = '';
  sucmsg = '';
  loading = false;
  ngOnInit(): void {
    this.initialForm();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.roles = this.storageService.getUser().roles;
    }
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
      // email: this.loginForm.value.email,
      hash: this.loginForm.value.password,
      phone:this.loginForm.value.email
    };
    if (data.phone == "" || data.hash == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.dataServise.postValue('admin/login', data).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.errmsg = res.message || 'These credentials do not match !!.';
            this.loading = false;
          } else {
            this.storageService.saveUser(data);
            localStorage.setItem('auth', JSON.stringify(res.message));
            this.sucmsg = res.message || 'sucessfull !!.';
            this.showSuccess()
            this.loading = false;
            this.router.navigate(['auth/dashboard/']);
          }
        },
        (e) => {
          this.loading = false;
          this.showError()
        }
      );
    }
  }

  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Phone Number or Password is incorrect', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
