import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../servise/user-api.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  userData: any;
  p: number = 1;
  iconmode = true;
  AdminLoginForm: FormGroup | any;
  errmsg = '';
  sucmsg = '';
  loading = false;

  constructor(
    public dataServise: UserApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
  iconclick() {
    this.iconmode = !this.iconmode;
  }
  initialForm() {
    this.AdminLoginForm = this.fb.group({
      email: '',
      password: '',
      name: '',
      number: '',
    });
  }
  ngOnInit(): void {
    this.getAllData();
    this.initialForm();
  }

  getAllData() {
    var Auth = JSON.parse(localStorage.getItem('auth') || '{}');
    var JToken = Auth.token || '';
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + JToken);

    this.dataServise
      .getAllData('admin', { headers: header })
      .subscribe((res) => {
        this.userData = res;
      });
  }
  handleDelete(id: any) {}
  AdminLogin() {
    this.loading = true;
    let data = {
      email: this.AdminLoginForm.value.email,
      password: this.AdminLoginForm.value.password,
      name: this.AdminLoginForm.value.name,
      phone: this.AdminLoginForm.value.number,
    };

    this.dataServise.postValue('admin/register', data).subscribe(
      (res: any) => {
        if (res.errorMessage) {
          this.errmsg = res.message || 'These credentials do not match !!.';
          this.loading = false;
        } else {
          this.sucmsg = res.message || 'sucessfull !!.';
          this.loading = false;
          window.location.href = '/auth/admins/';
        }
      },
      (e) => {
        this.loading = false;
      }
    );
  }
}
