import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
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
  submitted= false
  maxDate: any;
  onChangeObj(newObj: any) {
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
    this. futureDateDisable();
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
      todate: new FormControl('',[Validators.required]),
      // user: new FormControl(null,[Validators.required]),
    }, {validator: this.dateLessThan('fromdate', 'todate')});
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

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
  }
  emitEvent() {
    this.loading = true;
    this.submitted = true

    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    let detailObj = {
      id: this.UserName,
    };
    if (fromdate == "" || todate== "" || this.UserName =="User" || this.UserName ==undefined ) {
      
      this.isEmpty();
      this.loading = false;
    }else if(!this.loginForm.valid){
      this.showmsg();
      this.loading = false;
    }
    // if(!this.loginForm.valid){
    //   this.loading =false
    //   return
    // }
     else {
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
    this.toastr.error('Fill All The Field', 'Error');
  }
  showmsg(){
    this.toastr.error('From date must be less than to date', 'Error')
  }
  futureDateDisable(){
    var date :any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();

    if(todayDate < 10){
      todayDate = "0" + todayDate; //1,2..9
    }
    if(month < 10){
      month = "0" + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;  //2022-12-31

  }
}
