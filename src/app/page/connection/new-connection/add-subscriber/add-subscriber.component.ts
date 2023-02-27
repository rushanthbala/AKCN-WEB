import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';
import { SharedService } from 'src/app/servise/shared/shared.service';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss'],
})
export class AddCSubsciberComponent implements OnInit {
  @Input() object: object | any;
  @Output() OnClick = new EventEmitter<any>();
  public areaArray: any = [];
  public roadArray: any = [];
  public technicianArray: any = [];
  public BranchArray: any = [];

  public roadId: any;
  public areaId: any;
  public technicianId: any;
  public branchId: any;

  errmsg = '';
  sucmsg = '';
  loading = false;
  // dynamic form
  userForm: FormGroup | any;
  submitted = false;
  nic: any;
  isSubmitted= false 
  ngOnInit(): void {
    setTimeout(() => {
      this.getAll();
    });
    this.nic = this.shared.getMessage();
  }
  getAll() {
    // get roadArray
    this.dataServise.getData(`road`).subscribe((res) => {
      this.roadArray = res;
    });
    // areaArray
    this.dataServise.getData(`area`).subscribe((res) => {
      this.areaArray = res;
    });
    //get employye array
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.technicianArray = res;
    });
    //get branch array
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
    });
  }

  onSelect(val: any) {
    this.roadId = val;
  }
  onSelectBranch(val: any) {
    this.branchId = val;
  }

  onSelectarea(val: any) {
    this.areaId = val;
  }
  onSelectTechnician(val: any) {
    this.technicianId = val;
  }

  public checkErrorUserForm = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };
  onSubmit(values: any) {}
  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    private toastr: ToastrService,
    private shared: SharedService
  ) {
    this.userForm = this.fb.group(
      {
        primaryPhone: ['', Validators.required],
        secondaryPhone: '',
        email: '',
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        type: ['Normal', Validators.required],
        TV: ['', Validators.required],
        OldID: '',
        ConnectionAddress: ['', Validators.required],
        ConnectionDate: ['', Validators.required],
        Arrears: ['', Validators.required],
        ConnectionFee: ['', Validators.required],
      }
    );
  }
  // passwordMatchValidator(frm: FormGroup) {
  //   return frm.controls['password'].value === frm.controls['cPassword'].value
  //     ? null
  //     : { mismatch: true };
  // }
  inputset: FormGroup | any;
  addEventClick() {
    this.submitted = true;

    var data;
    if (this.userForm.value.secondaryPhone) {
      data = {
        subscriberNIC: this.nic,
        primaryPhone: this.userForm.value.primaryPhone,
        secondaryPhone: this.userForm.value.secondaryPhone,
        // email: this.userForm.value.email,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        // hash: this.userForm.value.password,
        ppVerified: 1,
      };
    } else {
      data = {
        subscriberNIC: this.nic,
        primaryPhone: this.userForm.value.primaryPhone,
        // email: this.userForm.value.email,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        // hash: this.userForm.value.password,
        ppVerified: 1,
      };
    }

    var checkData: boolean =
      this.technicianId == '' ||
      this.technicianId == undefined ||
      this.roadId == '' ||
      this.roadId == undefined ||
      this.areaId == '' ||
      this.areaId == undefined ||
      this.branchId == '' ||
      this.branchId == undefined;

    if (this.userForm.valid && !checkData) {
      this.dataServise.postValue('auth/register', data).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.errmsg = res.message || 'Something Went wrong.';
            this.loading = false;
          } else {
            var cid = res.msg.id;
            let obj = {
              connectionType: this.userForm.value.type,
              tvCount: this.userForm.value.TV,
              oldID: this.userForm.value.OldID,
              areaCode: this.areaId,
              roadID: this.roadId,
              connectionAddress: this.userForm.value.ConnectionAddress,
              technicianId: this.technicianId,
              dueAmount: this.userForm.value.Arrears,
              ConnectionFee: this.userForm.value.ConnectionFee,
              roadId: 1,
              customerID: cid,
              status: 'Active',
              connectedDate: this.userForm.value.ConnectionDate,
              connectionStatus: 'ACTIVE',
              actionDate: this.userForm.value.ConnectionDate,
              branchID: this.branchId,
            };

            this.dataServise.postValue('connection', obj).subscribe(
              (res: any) => {
                if (res.errorMessage) {
                  this.errmsg = res.message || 'Something Went wrong.';
                  this.loading = false;
                } else {
                  this.sucmsg = res.message || 'sucessfull !!.';
                  this.showSuccess();
                  this.loading = false;
                  this.OnClick.emit();
                  this.isSubmitted = true
                }
              },
              (e) => {
                this.loading = false;
                this.showError();
              }
            );
          }
        },
        (e) => {
          this.loading = false;
          this.showError();
        }
      );
    } else {
      this.isEmpty();
    }
  }
  showSuccess() {
    this.toastr.success('Sucessfully Created', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Please fill out all field', 'Error');
  }
}
