import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/servise/login/login.service';
import Validation from 'src/Validation/password.validation';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent {
  phoneNo: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: LoginService,
    private toastr: ToastrService
  ) {}
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  errmsg = '';
  sucmsg = '';
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  forgotpassword() {
    let data = {
      phone: '0'+this.loginForm.value.email,
    };
    // console.log(data, 'll')
    if (!this.loginForm.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataService.postValue(`admin/sendOTP/${data}`, data).subscribe(
        (res: any) => {
          if (res.match == false) {
            this.errmsg = res.message;
            this.ifFalse();
            // alert(this.errmsg)
          } else {
            this.router.navigate([`otp/${data.phone}`]);
          }
        },
        (e) => {
          this.loading = false;
          this.showError();
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
    this.toastr.error('Fill All The Field', 'Error');
  }
  ifFalse() {
    this.toastr.error('Invalid Phone Number', 'Error');
  }
}
