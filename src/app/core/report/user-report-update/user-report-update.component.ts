import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-user-report-update',
  templateUrl: './user-report-update.component.html',
  styleUrls: ['./user-report-update.component.scss'],
})
export class UserReportUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{
    user: any;
    fromdate: any;
    todate: any;
  }>();
  errmsg = '';
  sucmsg = '';
  loading = false;
  public TechnicianName: any = 'Technician';
  endDate: any;
  startDate: any;
  validationError: string | undefined;
  public TechnicianId: any;
  public TechnicianArray: any = [];

  public selectedDeviceObj: any = {};
  UserArray: any;
  UserName: any ="User";
  UserID: any;
  onChangeObj(newObj: any) {
    console.log(newObj.firstName);
    console.log(newObj.id);
    this.UserName = newObj.firstName;
    this.UserID = newObj.id;
    // ... do other stuff here ...
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dataServise: HttpService
  ) {
    this.initialForm();
  }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.UserArray = res;
      // if (res.length > 0) {
      //   this.UserName = res.firstName;
      //   // this.UserID = res.id;
      // }
    });
  }

  initialForm() {
    this.loginForm = this.fb.group({
      fromdate: new FormControl('', [Validators.required]),
      todate: new FormControl('', [Validators.required]),
    }, {validator: this.dateLessThan('fromdate', 'todate')});
  }

  // validateDates() {
  //   if (this.startDate > this.endDate) {
  //     this.validationError = 'From date must be greater than to date';
  //   } else {
  //     this.validationError = '';
  //   }
  // }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
     let f = group.controls[from];
     let t = group.controls[to];
     if (f.value > t.value) {
       return {
         dates: "Date from should be less than Date to"
       };
     }
     return {};
    }
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    let detailObj = {
      id: this.UserName,
    };
    if (!this.loginForm.valid || this.UserName =="User" || this.UserName ==undefined ) {
      console.log(this.UserName,"this.UserName");
      
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({
        user: detailObj,
        fromdate: fromdate,
        todate: todate,
      });

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
    this.toastr.error('Pleace Recheck your Details', 'Error');
  }
}
