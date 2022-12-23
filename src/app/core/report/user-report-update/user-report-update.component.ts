import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-user-report-update',
  templateUrl: './user-report-update.component.html',
  styleUrls: ['./user-report-update.component.scss']
})
export class UserReportUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ user: any, fromdate: any, todate: any }>()
  errmsg = '';
  sucmsg = '';
  loading = false;
  public TechnicianName: any = 'Technician';;
  public TechnicianId: any;
  public TechnicianArray: any = [];

  public selectedDeviceObj: any = {}
  onChangeObj(newObj: any) {
    console.log(newObj.firstName);
    console.log(newObj.id);
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    // ... do other stuff here ...
  }
  constructor(private fb: FormBuilder, private toastr: ToastrService,    public dataServise: HttpService

  ) { }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();
 this.getAll()
  }
  getAll() {
    // get TechnicianArray

    this.dataServise.getData(`employee`).subscribe((res) => {
      this.TechnicianArray = res;
      if(res.length >0){
        this.TechnicianName=res[0].firstName
        this.TechnicianId=res[0].id
      }
    });
  }
  initialForm() {
    this.loginForm = this.fb.group({
      fromdate: "",
      todate: "",
    });
  }

  searching() {
    console.log(this.loginForm.value);
  }
  emitEvent() {
    this.loading = true;

    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    if ( fromdate == "" || todate == "") {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ user: this.TechnicianId, fromdate: fromdate, todate: todate })

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
