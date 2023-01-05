import { Component, EventEmitter, Output } from '@angular/core';
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
  onChangeObj(newObj: any) {
    console.log(newObj.firstName);
    console.log(newObj.id);
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
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  searching() {
    console.log(this.loginForm.value);
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

    // if (fromdate == "" || todate == "") {
    //   this.isEmpty();
    //   this.loading = false;
    // }else if(!this.loginForm.valid){
    //   this.showmsg();
    //   this.loading = false;
    // }
    if(!this.loginForm.valid){
      this.loading = false;
      return
    } else {
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
}
