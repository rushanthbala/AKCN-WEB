import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-due-report-update',
  templateUrl: './due-report-update.component.html',
  styleUrls: ['./due-report-update.component.scss'],
})
export class DueReportUpdateComponent implements OnInit {
  @Output() OnClick = new EventEmitter<{ user: any; minAmount: any }>();
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

  public minAmount: any;

  submitted = false;

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
    setTimeout(() => {
      this.getAll();
    });
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
    // get branch
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
    });
  }

  findArea(id: any) {
    this.dataServise.getData(`areaBybranchId/${id}`).subscribe((res) => {
      this.AreaArray = res;
    });
  }

  findRoad(id: any) {
    this.dataServise.getData(`road/roadByAreaID/${id}`).subscribe((res) => {
      this.RoadArray = res;
    });
  }

  initialForm() {
    this.loginForm = this.fb.group({
      minAmount: new FormControl('', [Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  emitEvent() {
    let detailObj = {
      branchID: this.BranchId,
      RoadID: this.RoadId,
      AreaID: this.AreaId,
      StatusName: this.StatusName,
    };

    let fromdate = this.loginForm.value.fromdate;
    let minAmount = this.loginForm.value.minAmount;

    if (
      minAmount == '' ||
      this.BranchId == undefined ||
      this.RoadId == undefined ||
      this.AreaId == undefined ||
      this.StatusName == undefined
    ) {
      this.isEmpty();
      this.loading = false;
    } else {
      this.OnClick.emit({ user: detailObj, minAmount: minAmount });

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
  showmsg() {
    this.toastr.error(`Can't be All fields are All`, 'Error');
  }
}
