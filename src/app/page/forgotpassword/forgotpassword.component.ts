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
    private toastr: ToastrService,
    private shared: SharedService,
  ) {}
  forgotForm: FormGroup | any;
  loading = false;
  submitted = false;
  errmsg = '';
  sucmsg = '';
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.forgotForm = this.fb.group({
      phone: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.forgotForm.controls;
  }

  forgotpassword() {
    let data = {
      phone: '0'+this.forgotForm.value.phone,
    };
    if (!this.forgotForm.valid) {
      this.submitted = true;
      return;
    } else {
      this.dataService.postValue(`admin/sendOTP/${data}`, data).subscribe(
        (res: any) => {
          if (res.match == false) {
            this.errmsg = res.message;
            this.loading = false;
          } else {
            this.router.navigate([`otp`]);
            this.shared.setMessage(data.phone);
          }
        },
        (e) => {
          this.loading = false;
          this.showError();
        }
      );
    }
  }
  showError() {
    this.toastr.error('Please Enter the Valid Phone Number', 'Error');
  }
}
