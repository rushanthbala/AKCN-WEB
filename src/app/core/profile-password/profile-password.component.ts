import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  constructor(private fb: FormBuilder, public dataServise: HttpService) {}

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
    if (!this.password.valid) {
      this.submitted = true;
    }
  }
}
