import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
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
  submitted = false

  ngOnInit(): void {
    this.initialForm();

  }
  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  searching() {
  }
  rename(name:string){
    if(name=='ConnectionID'){
      return 'Connection ID'
    }else  if(name=='PhoneNo'){
      return 'Phone Number'
    }else  if(name=='NIC'){
      return 'NIC'
    }else  if(name=='OldID'){
      return 'Old ID'
    }else  if(name=='name'){
      return 'Name'
    }else{
      return 'Value'
    }
  }
  emitEvent() {
    this.submitted = true
    this.loading = true;

    let sInput = this.loginForm.value.searchinginput;
    let sType = this.loginForm.value.type;
    if (!this.loginForm.valid) {
      // this.isEmpty();
      this.loading = false;
      return
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
    this.toastr.error('Fill All The Field', 'Error');
  }
}
