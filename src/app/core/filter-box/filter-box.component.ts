import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ searchinginput: string, type: string }>()
  errmsg = '';
  sucmsg = '';
  loading = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
  ) { }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();

  }
  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let sInput = this.loginForm.value.searchinginput;
    let sType = this.loginForm.value.type;
    if (sInput == "" || sType == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ searchinginput: sInput, type: sType })

      this.loading = false;
    }
  }
  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Feild', 'Error');
  }
}
