import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-connection-search',
  templateUrl: './connection-search.component.html',
  styleUrls: ['./connection-search.component.scss'],
})
export class ConnectionSearchComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{
    searchinginput: string;
    type: string;
  }>();
  errmsg = '';
  sucmsg = '';
  loading = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
  loginForm: FormGroup | any;
  submitted = false;

  ngOnInit(): void {
    this.initialForm();
  }
  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  emitEvent() {
    this.loading = true;

    let sInput = this.loginForm.value.searchinginput;
    let sType = this.loginForm.value.type;
    if (!this.loginForm.valid) {
      this.submitted = true;
      this.loading = false;
      return;
    } else {
      this.OnClick.emit({ searchinginput: sInput, type: 'sType' });

      this.loading = false;
    }
  }
}
