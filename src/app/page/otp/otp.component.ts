import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
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
      email: new FormControl('', [Validators.required])
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
    this.router.navigate(['reEnterPassword'])
   }
  }
}
