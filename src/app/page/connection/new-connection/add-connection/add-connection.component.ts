import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss']
})
export class AddConnectionComponent implements OnInit  {
  @Input() object: object | any;
  @Output() OnClick = new EventEmitter<any>()
  public areaArray: any = [];
  public roadArray: any = [];
  public technicianArray: any = [];
  public BranchArray: any = [];
  
  public roadId: any 
  public branchId: any 
  public areaId: any 
  public technicianId: any 

  errmsg = '';
  sucmsg = '';
  loading = false;
  // dynamic form
  userForm: FormGroup | any;
  submitted = false;
  ngOnInit(): void {
    this.getAll()
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
    this.dataServise.getData(`employee`).subscribe((res) => {
      this.technicianArray = res;
    });
    this.dataServise.getData(`branch`).subscribe((res) => {
      this.BranchArray = res;
    });
    
    console.log(this.roadArray, this.areaArray);

  }

  
  onSelect(val: any) {
    this.roadId = val
  }
  onSelectBranch(val: any) {
    this.branchId = val
  }
  
  onSelectarea(val: any) {
    this.areaId = val
  }
  onSelectTechnician(val: any) {
    this.technicianId = val
  }

  public checkErrorUserForm = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };
  onSubmit(values: any) {
    // console.log(values, "ASAS");

  }
  constructor(private fb: FormBuilder, public dataServise: HttpService, private toastr: ToastrService,
  ) {

    this.userForm = this.fb.group({

      type: ['Normal', Validators.required],
      TV: ['', Validators.required],
      OldID: ['', Validators.required],
     
      ConnectionAddress: ['', Validators.required],
      ConnectionDate: ['', Validators.required],
      Arrears: ['', Validators.required],
      ConnectionFee: ['', Validators.required],
      // ConnectionFee
      // Email: ['', [Validators.required, Validators.email]]
    });
  }
  inputset: FormGroup | any;
    addEventClick() {

      this.submitted = true;
      console.log(this.userForm,this.userForm.valid, "userForm.valid");


      let data = {
        connectionType: this.userForm.value.type,
        tvCount: this.userForm.value.TV,
        oldID: this.userForm.value.OldID,
        areaCode: this.areaId,
        roadID: this.roadId,
        connectionAddress: this.userForm.value.ConnectionAddress,
        technicianId:this.technicianId,
        dueAmount: this.userForm.value.Arrears,
        ConnectionFee: this.userForm.value.ConnectionFee,
        // roadId:1,
        customerID:this.object.customerID,
        "status":"Active", 
        "connectedDate": this.userForm.value.ConnectionDate,
        "connectionStatus":"ACTIVE", 
        "actionDate" :this.userForm.value.ConnectionDate,
        branchID:this.branchId
      }
      console.log(data);
      var checkData = this.technicianId =="" ||this.technicianId==undefined||
      this.roadId =="" ||
      this.areaId =="" ||this.areaId==undefined ||
      this.branchId =="" ||this.branchId==undefined
      if (this.userForm.valid || !checkData  ) {
        this.dataServise.postValue('connection', data).subscribe(
          (res: any) => {
            if (res.errorMessage) {
              this.errmsg = res.message || 'Something Went wrong.';
              this.loading = false;
            } else {
              this.sucmsg = res.message || 'sucessfull !!.';
              this.showSuccess()
              this.loading = false;
              this.OnClick.emit()
            }
          },
          (e) => {
            this.loading = false;
          }
        );
      } else {
        this.showError()
      }


    }
  showSuccess() {
    this.toastr.success('Sucessfully Created', 'Sucessfull');
    
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }

}
