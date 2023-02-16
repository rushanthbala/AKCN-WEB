import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import { UserApiService } from '../../servise/user-api.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  loading = false;
  submitted = false;
  profileForm: FormGroup | any;
  currentUser: any;
  admin: any;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dataservise: UserApiService
  ) {}

  ngOnInit(): void {
    this.initialForm();
    this.getData();
  }

  initialForm() {
    this.profileForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }
  emitEvent() {
    if (!this.profileForm.valid) {
      this.submitted = true;
    }
  }
  getData() {
    const Auth: any = localStorage.getItem('auth');
    this.currentUser = JSON.parse(Auth);
  }
}
