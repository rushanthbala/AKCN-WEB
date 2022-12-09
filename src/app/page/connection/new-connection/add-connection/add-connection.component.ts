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
  
  public roadId: any 
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
    console.log(this.roadArray, this.areaArray);

  }

  
  onSelect(val: any) {
    this.roadId = val
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
      Area: [
         this.areaId,
        [Validators.required],
      ],
      Road: [ this.roadId, Validators.required],
      ConnectionAddress: ['', Validators.required],
      Technician: ['', Validators.required],
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
    console.log(this.userForm.valid, "userForm.valid");


    let data = {
      type: this.userForm.value.type,
      TV: this.userForm.value.TV,
      OldID: this.userForm.value.OldID,
      Area: this.areaId,
      Road: this.roadId,
      ConnectionAddress: this.userForm.value.ConnectionAddress,
      technicianId:this.technicianId,
      Arrears: this.userForm.value.Arrears,
      ConnectionFee: this.userForm.value.ConnectionFee,
    }
    console.log(data);
    if (this.userForm.valid) {
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

    }


  }
  showSuccess() {
    this.toastr.success('Sucessfully Login', 'Sucessfully');
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }

}
