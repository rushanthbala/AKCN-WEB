import { HttpHeaders } from '@angular/common/http';
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
import { StorageServiceService } from 'src/app/servise/storageService/storage-service.service';
import { UserApiService } from '../../servise/user-api.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  loading = false;
  submitted = false;
  loginForm: FormGroup | any;
  currentUser : any;
  admin: any;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dataservise: UserApiService,
    private storageService : StorageServiceService
  ) {}

  ngOnInit(): void {
    this.initialForm();
    this.getData();
    // const Auth : any = localStorage.getItem("auth");
    // const message = JSON.parse(Auth);
    // const AdminId = message.id;
    // const phone = message.phone;
    // console.log(AdminId)
    // console.log(phone)
  }

  initialForm() {
    this.loginForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  emitEvent() {
    if (!this.loginForm.valid) {
      this.submitted = true;
    }
  }
  getData() {
    const Auth: any = localStorage.getItem('auth')
    this.currentUser = JSON.parse(Auth);
    // console.log(this.currentUser, 'lllll')
  }
}
