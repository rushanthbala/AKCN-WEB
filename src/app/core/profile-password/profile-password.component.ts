import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';
import Validation from 'src/Validation/password.validation';


@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss'],
})
export class ProfilePasswordComponent {
  loading = false;
  submitted = false;
  password: FormGroup | any;
  currentUser: any;
  errmsg= '';

  constructor(private fb: FormBuilder, public dataServise: HttpService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.passwordForm();
  }

  passwordForm() {
    this.password = this.fb.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.password.controls;
  }

  changePassword() {

    const Auth : any = localStorage.getItem('auth')
    const message = JSON.parse(Auth);
    const phone = message.phone;
    const OldPassword = this.password.value.oldPassword;

    let data = {
      hash: this.password.value.confirmPassword
    }
    if (!this.password.valid) {
      this.submitted = true;
      return
    }
    else{
      this.dataServise.putValue(`admin/changePassword/${phone}/${OldPassword}`, data).subscribe(
        (res : any) =>{
          if(res.errorMessage){
            this.errmsg = res.message;
          }else{
            this.showSuccess();
          }
        },
        (e) => {
          this.loading = false
          this.showError()
        }
      )
      this.password.reset();
    }
  }
  showSuccess() {
    this.toastr.success('Successfully Password Changed', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Old password is incorrect', 'Error');
  }
}
