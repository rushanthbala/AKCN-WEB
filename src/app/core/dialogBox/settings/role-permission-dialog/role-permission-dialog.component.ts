import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-role-permission-dialog',
  templateUrl: './role-permission-dialog.component.html',
  styleUrls: ['./role-permission-dialog.component.scss'],
})
export class RolePermissionDialogComponent implements OnInit, AfterViewInit {
  public loading: Boolean = false;
  public ifData: boolean = false;
  public UserPermisionArray: any = false;
  public currentData: any = {};


  isChecked = true;
  
  constructor(
    public dialogRef: MatDialogRef<RolePermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
        public dataServise: HttpService,
    private toastr: ToastrService
  ) {}
  ngAfterViewInit(): void {
    this.getAll(this.data.subscriberdata.id)
    // this.initialReconnectionForm()
  }
  
  chackRequest: FormGroup | any;
  formGroup: FormGroup | any;
  ngOnInit(): void {
    if (this.data.subscriberdata == '{}') {
      this.ifData = false;
    } else  {
      this.ifData = true;
      this.currentData = this.data.subscriberdata;
      this.initialReconnectionForm()
    } 
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.formGroup = this._formBuilder.group({
      webViewConnection: this.ifData ? this.UserPermisionArray.webViewConnection : true,
      webCreateTicketAndRequest: this.ifData ? this.UserPermisionArray.webCreateTicketAndRequest : '',
      webAdjustPayment: this.ifData ? this.UserPermisionArray.webAdjustPayment : '',
      webWareHouse: this.ifData ? this.UserPermisionArray.webWareHouse : '',

      webAddConnection: this.ifData ? this.UserPermisionArray.webAddConnection : '',
      webUpdateTicketAndRequest: this.ifData ? this.UserPermisionArray.webUpdateTicketAndRequest : '',
      webUserReport: this.ifData ? this.UserPermisionArray.webUserReport : '',
      webStore: this.ifData ? this.UserPermisionArray.webStore : '',

      webAlterConnection: this.ifData ? this.UserPermisionArray.webAlterConnection : '',
      webMakePayment: this.ifData ? this.UserPermisionArray.webMakePayment : '',
      webDueReport: this.ifData ? this.UserPermisionArray.webDueReport : '',
      roleId: this.ifData ? this.UserPermisionArray.roleId : '',
    });
  }
  alertFormValues(formGroup: FormGroup) {
    // alert(JSON.stringify(formGroup.value, null, 2));
    this.putMethod(formGroup.value)
  }
  getAll(id:any) {
    // get TechnicianArray
    this.dataServise.getData(`rolepermission/${id}`).subscribe((res) => {
      this.UserPermisionArray = res;
      this.initialReconnectionForm();
    });
  }
  putMethod(sendObj:any){
    this.dataServise.putValue(`rolepermission/${this.UserPermisionArray.id}`, sendObj).subscribe(
      (res: any) => {
        if (res.errorMessage) {
          this.loading = false;
        } else {
          this.showSuccess();
          this.loading = false;
        }
      },
      (e) => {
        this.loading = false;
        this.showError();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Sucessfully Changed', 'Sucessfully');
    window.location.reload();
  }
  showSuccessAdd() {
    this.toastr.success('Sucessfully Added', 'Sucessfully');
    // window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
