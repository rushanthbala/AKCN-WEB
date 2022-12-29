import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-unpaid-report-update',
  templateUrl: './unpaid-report-update.component.html',
  styleUrls: ['./unpaid-report-update.component.scss'],
})
export class UnpaidReportUpdateComponent {
  @Output() OnClick = new EventEmitter<{ user: any }>();
  errmsg = '';
  sucmsg = '';
  loading = false;
  public TechnicianName: any = 'Technician';
  public TechnicianId: any;
  public TechnicianArray: any = [];
  public selectedDeviceObj: any = {};
  public selectedAreaObj: any = {};
  public selectedRoadObj: any = {};
  public selectedBranchObj: any = {};
  public selectedStatusObj: any = {};

  public BranchName: any = 'All';
  public BranchId: any;
  public BranchArray: any = [];

  public RoadName: any = 'All';
  public RoadId: any;
  public RoadArray: any = [];

  public AreaName: any = 'All';
  public AreaId: any;
  public AreaArray: any = [];

  public StatusName: any = 'All';
  public StatusId: any;
  public StatusArray: any = [];

  onChangeObj(newObj: any) {
    this.TechnicianName = newObj.firstName;
    this.TechnicianId = newObj.id;
    // ... do other stuff here ...
  }
  onChangeObjBranch(newObj: any) {
    this.BranchName = newObj.branchName;
    this.BranchId = newObj.id;
    this.findArea(newObj.id);
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
    this.findRoad(newObj.id);
    // ... do other stuff here ...
  }
  onChangeObjStatus(newObj: any) {
    this.StatusName = newObj.value;
    this.StatusId = newObj.id;
    // ... do other stuff here ...
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dataServise: HttpService
  ) {}
  loginForm: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();
    this.getAll();
  }
  getAll() {
    this.StatusArray = [
      {
        id: 'Active',
        value: 'Active',
      },
      {
        id: 'Inactive',
        value: 'Inactive',
      },
    ];
    // get TechnicianArray
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
  }

  // if(AreaID = 0){

  // } else{

  // }

  findArea(id: any) {
    console.log('findArea', id);
    this.dataServise.getData(`areaBybranchId/${id}`).subscribe((res) => {
      this.AreaArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
  }

  findRoad(id: any) {
    console.log('find road', id);
    this.dataServise.getData(`road/roadByAreaID/${id}`).subscribe((res) => {
      this.RoadArray = res;
      // if(res.length >0){
      //   this.TechnicianName=res[0].firstName
      //   this.TechnicianId=res[0].id
      // }
    });
  }

  initialForm() {
    // this.loginForm = this.fb.group({
    //   branch : new FormControl('', Validators.required),
    // });
  }

  emitEvent() {
    console.log('mic01');

    console.log(this.BranchName, this.RoadName, this.AreaName);
    console.log(this.BranchId, this.RoadId, this.AreaId);
    let detailObj = {
      branchID: this.BranchId,
      RoadID: this.RoadId,
      AreaID: this.AreaId,
    };
    // this.loading = true;

    // let fromdate = this.loginForm.value.fromdate;
    // let minAmount = this.loginForm.value.minAmount;

    if (
      this.BranchId == undefined ||
      this.RoadId == undefined ||
      this.AreaId == undefined
    ) {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ user: detailObj });

      this.loading = false;
    }

    // this.OnClick.emit({ user: detailObj });

    //   this.loading = false;
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
  showmsg() {
    this.toastr.error(`Can't be All fields are All`, 'Error');
  }
}
