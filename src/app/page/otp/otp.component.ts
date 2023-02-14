import { Component } from '@angular/core';
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
import { SharedService } from 'src/app/servise/shared/shared.service';

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
    private toastr: ToastrService,
    private shared: SharedService
  ) {}
  otpForm: FormGroup | any;
  loading = false;
  submitted = false;
  errmsg = '';
  phone: any;
  ngOnInit(): void {
    this.initialForm();
    this.phone = this.shared.getMessage();
  }
  initialForm() {
    this.otpForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }

  otp() {
    let data = {
      phone: this.phone,
      resetotp: this.otpForm.value.email,
    };

    if (!this.otpForm.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataservice.postValue(`admin/checkOTP`, data).subscribe(
        (res: any) => {
          if (res.user.match == false) {
            this.errmsg = res.message;
            this.isFalse();
          } else {
            this.router.navigate([`reEnterPassword`]);
            this.shared.setMessage(data);
          }
        },
        (e) => {
          this.loading = false;
          this.showError();
        }
      );
    }
  }

  reSend() {
    let data = {
      phone: this.phone,
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

  showError() {
    this.toastr.error('Please Enter the Valid Phone Number', 'Error');
  }
  isFalse() {
    this.toastr.error('Invalid Otp', 'Error');
  }
}
