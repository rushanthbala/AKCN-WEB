import { Component, EventEmitter, Output, VERSION, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-collection-report-update',
  templateUrl: './collection-report-update.component.html',
  styleUrls: ['./collection-report-update.component.scss'],
})
export class CollectionReportUpdateComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  @Output() OnClick = new EventEmitter<{
    fromdate: any;
    todate: any;
  }>();
  errmsg = '';
  sucmsg = '';
  loading = false;
  public TechnicianName: any = 'Technician';
  public TechnicianId: any;
  public TechnicianArray: any = [];

  public selectedDeviceObj: any = {};
  BranchName: any;
  BranchId: any;
  BranchArray: any;
  validationError: string | undefined;
  startDate: any;
  endDate: any;
  d: any;
  submitted = false;
  maxDate: any;

  @ViewChild('picker') picker: any;
  name = 'Angular ' + VERSION.major;
  toggle() {
    this.picker.open();
  }
  @ViewChild('picker1') picker1: any;
  name1 = 'Angular ' + VERSION.major;
  toggle1() {
    this.picker1.open();
  }

  onChangeObj(newObj: any) {
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
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
    this. futureDateDisable()
  }
  getAll() {
    // get TechnicianArray
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });

    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
      if (res.length > 0) {
        this.TechnicianName = res[0].firstName;
        this.TechnicianId = res[0].id;
      }
    });
  }

  initialForm() {
    this.loginForm = this.fb.group({
      fromdate: new FormControl('', [Validators.required]),
      todate: new FormControl('', [Validators.required]),
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
         dates: "From date should be less than to date"
       };
     }
     return {};
    }
  }

  searching() {
  }
  onChangeObjBranch(newObj: any) {
    this.BranchName = newObj.branchName;
    this.BranchId = newObj.id;
    // ... do other stuff here ...
  }
  emitEvent() {
    this.loading = true;
    this.submitted = true;

    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    if (fromdate == "" || todate == "") {
      this.isEmpty();
      this.loading = false;
    }else if(!this.loginForm.valid){
      this.showmsg();
      this.loading = false;
    }
    // if(!this.loginForm.valid){
    //   this.loading = false;
    //   return
    // } 
    else {
      this.OnClick.emit({
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
