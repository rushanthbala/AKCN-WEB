import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent {
  loading = false;
  submitted = false;
  loginForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.loginForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required])
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  emitEvent(){
    if(!this.loginForm.valid){
      this.submitted = true;
    }
  }
}
