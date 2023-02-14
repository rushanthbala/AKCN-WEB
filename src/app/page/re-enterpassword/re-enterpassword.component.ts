import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/servise/login/login.service';
import { SharedService } from 'src/app/servise/shared/shared.service';
import Validation from 'src/Validation/password.validation';

@Component({
  selector: 'app-re-enterpassword',
  templateUrl: './re-enterpassword.component.html',
  styleUrls: ['./re-enterpassword.component.scss'],
})
export class ReEnterpasswordComponent {
  errmsg: any;
  userData: any;
  message: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: LoginService,
    private toastr: ToastrService,
    private shared: SharedService
  ) {}
  reEnterPasswordForm: FormGroup | any;
  loading = false;
  submitted = false;
  data: any;
  ngOnInit(): void {
    this.initialForm();
    this.data = this.shared.getMessage();
  }
  initialForm() {
    this.reEnterPasswordForm = this.fb.group(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        cpassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: [Validation.match('password', 'cpassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.reEnterPasswordForm.controls;
  }
  login() {
    if (!this.reEnterPasswordForm.valid) {
      this.submitted = true;
      return;
    } else {
      let data = {
        phone: this.data?.phone,
        token: this.data?.resetotp,
        hash: this.reEnterPasswordForm.value.password,
      };

      this.dataService
        .putValue(`admin/forgetPassword/${data.phone}/${data.token}`, data)
        .subscribe(
          (res: any) => {
            if (res.errorMessage) {
              this.errmsg = res.message;
              this.loading = false;
            } else {
              this.router.navigate(['login']);
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
}
