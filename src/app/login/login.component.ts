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
  ) {}
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
    console.log(this.loginForm.value);
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    console.log(data, 'data');
    // {errorMessage: true, message: 'These credentials do not match!!.'}
    this.dataServise.postValue('superadmin/login', data).subscribe(
      (res: any) => {
        console.log('Post created successfully!', res);
        if (res.errorMessage) {
          this.errmsg = res.message || 'These credentials do not match !!.';
          // localStorage.setItem('auth', 'res.token');
          // this.router.navigate(['auth/home']);
          this.loading = false;
        } else {
          localStorage.setItem('auth', JSON.stringify(res.message));
          this.sucmsg = res.message || 'sucessfull !!.';
          console.log('auth', JSON.stringify(res.message));
          this.loading = false;
          this.router.navigate(['auth/dashboard/']);
        }
      },
      (e) => {
        // console.log(e, 'error');
        this.loading = false;
      }
    );
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
