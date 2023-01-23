import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/servise/login/login.service';
import Validation from 'src/Validation/password.validation';

@Component({
  selector: 'app-re-enterpassword',
  templateUrl: './re-enterpassword.component.html',
  styleUrls: ['./re-enterpassword.component.scss']
})
export class ReEnterpasswordComponent {
  errmsg: any;
  userData: any;
  message: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService : LoginService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validators: [Validation.match('password', 'cpassword')],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  login() {
   if(!this.loginForm.valid){
    this.submitted = true;
    return
   }else{
    var url = window.location.pathname;
    var phone = url.slice(17,27)

    var url2 = window.location.pathname;
    var otp = url2.substring(url2.lastIndexOf('/')+1)

    let data = {
      phone:phone,
      token: otp,
      hash:this.loginForm.value.password
    }
    // console.log(data, 'ff')

    this.dataService.putValue(`admin/forgetPassword/${data.phone}/${data.token}`, data).subscribe(
      (res : any) => {
        if(res.errorMessage){
          this.errmsg = res.message
          this.loading = false
        } else{
          this.router.navigate(['login'])
        }
      },
      (e) => {
        this.loading = false
        this.showError()
      }
    )
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
