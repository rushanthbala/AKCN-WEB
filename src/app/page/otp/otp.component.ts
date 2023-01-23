import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
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
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataservice: LoginService,
    private toastr: ToastrService
  ) {}
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  errmsg = '';
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  otp() {
    // var phone = first.msg.phone
    // console.log(phone)
    var url = window.location.pathname;
    var phoneNo = url.substring(url.lastIndexOf('/') + 1);
    // console.log(phoneNo);

    let data = {
      phone: phoneNo,
      resetotp: this.loginForm.value.email
    };
    // console.log(data, 'sssss');

    if (!this.loginForm.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataservice.postValue(`admin/checkOTP`, data).subscribe(
        (res:any) => {
          if (res.user.match == false) {
            this.errmsg = res.message;
            this.isFalse()
          } else {
            this.router.navigate([`reEnterPassword/${data.phone}/${data.resetotp}`]);
          }
        },(e) => {
          this.loading = false;
          this.showError();
        }
      );
    }
  }

  reSend() {
    var url = window.location.pathname;
    var phoneNo = url.substring(url.lastIndexOf('/') + 1);
    console.log(phoneNo);

    let data = {
      phone:phoneNo,
    };
    this.dataservice.postValue(`admin/sendOTP/${data.phone}`, data).subscribe(
      (res: any) => {
        if (res.errorMessage) {
          this.errmsg = res.message;
        }
      },
      (e) => {
        this.loading = false;
        this.showError();
      }
    );
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
  isFalse(){
    this.toastr.error('Invalid Otp', 'error')
  }
}
