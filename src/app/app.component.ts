import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel';
  constructor(private fb: FormBuilder) {}
  loginForm: FormGroup | any;

  // name = new FormControl('');
  // jobForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      name: 'name',
      password: '12121',
    });
  }
  login() {
    console.log(this.loginForm);
  }

  save() {
    console.log('saving form ===');
    // this.preview = JSON.stringify(this.jobForm.value);
  }
}
