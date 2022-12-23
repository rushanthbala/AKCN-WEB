import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-due-report-update',
  templateUrl: './due-report-update.component.html',
  styleUrls: ['./due-report-update.component.scss']
})
export class DueReportUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ user: any, fromdate: any, todate: any }>()
  errmsg = '';
  sucmsg = '';
  loading = false;
  public TechnicianName: any = 'Technician';;
  public TechnicianId: any;
  public TechnicianArray: any = [];

  public BranchName: any = 'All';;
  public BranchId: any;
  public BranchArray: any = [];

  public RoadName: any = 'All';;
  public RoadId: any;
  public RoadArray: any = [];

  public AreaName: any = 'All';;
  public AreaId: any;
  public AreaArray: any = [];

  public StatusName: any = 'All';;
  public StatusId: any;
  public StatusArray: any = [{
    id: "Active",
    value: "Active"
  },{
    id: "Inactive",
    value: "Inactive"
  }]

  public selectedDeviceObj: any = {}
  onChangeObj(newObj: any) {
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    // ... do other stuff here ...
  }
  onChangeObjBranch(newObj: any) {
    this.BranchName = newObj.branchName;
    this.BranchId = newObj.id;
    // ... do other stuff here ...
  }
  onChangeObjRoad(newObj: any) {
    this.RoadName = newObj.road;
    this.RoadId = newObj.id;
    // ... do other stuff here ...
  }
  onChangeObjArea(newObj: any) {
    this.AreaName = newObj.area;
    this.AreaId = newObj.id;
    // ... do other stuff here ...
  }
  onChangeObjStatus(newObj: any) {
    this.StatusName = newObj.id;
    this.StatusId = newObj.id;
    // ... do other stuff here ...
  }
  constructor(private fb: FormBuilder, private toastr: ToastrService, public dataServise: HttpService

  ) { }
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();
    this.getAll()
  }
  getAll() {
    console.log("0009");
    
    // get TechnicianArray
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
      console.log(res,"res");
      
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
    this.dataServise.getData(`area`).subscribe((res) => {
      this.AreaArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
    this.dataServise.getData(`road`).subscribe((res) => {
      this.RoadArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
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
    alert("okok")
    console.log("mic01");
    
    console.log(this.BranchId,this.RoadName,this.AreaName,this.StatusName);
    
    // this.loading = true;

    let fromdate = this.loginForm.value.fromdate;
    let todate = this.loginForm.value.todate;

    // if (fromdate == "" || todate == "") {
    //   this.isEmpty();
    //   this.loading = false;
    // } else {
    //   this.OnClick.emit({ user: this.TechnicianId, fromdate: fromdate, todate: todate })

    //   this.loading = false;
    // }
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
