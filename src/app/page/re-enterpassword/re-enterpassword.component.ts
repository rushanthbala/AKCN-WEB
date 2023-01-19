import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/Validation/password.validation';

@Component({
  selector: 'app-re-enterpassword',
  templateUrl: './re-enterpassword.component.html',
  styleUrls: ['./re-enterpassword.component.scss']
})
export class ReEnterpasswordComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }
  loginForm: FormGroup | any;
  loading = false;
  submitted = false
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required])
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
    this.router.navigate(['otp'])
   }
  }
}
