import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoDataComponent } from 'src/app/core/dialogBox/pending/no-data/no-data.component';
import { UpdateDataComponent } from 'src/app/core/dialogBox/pending/update-data/update-data.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-add-arrears',
  templateUrl: './add-arrears.component.html',
  styleUrls: ['./add-arrears.component.scss']
})
export class AddArrearsComponent {
  animal: string | any;
  name: string | any;
  userData: any;
  showTable: boolean = false;
  tableResult: any;
  public loading: Boolean = true;

  constructor(private fb: FormBuilder, public dataServise: HttpService, public dialog: MatDialog,
    public toastr: ToastrService,
  ) { }
  searching(first: Object | any) {
    var connectionId = first.connectionId
    var amount = first.amount
    var arreardate = first.arreardate
    console.log(connectionId, amount, arreardate);

// add to database

let todayDate =new Date()
var admin = JSON.parse(localStorage.getItem('auth') || '{}');
var adminId = admin ? admin.id : null

let dataObj ={
  connectionID:connectionId,
  paidDateTime:formatDate(arreardate, 'yyyy-MM-dd', "en-US"),
  description: "Arrears Amount",
  paymentType:"Arrears",
  amount:amount,
  enteredBy:adminId,
  conductedBy:adminId
}
console.log(dataObj,"dataObj");

if (dataObj.amount == "" || dataObj.connectionID == "" ||dataObj.paidDateTime == ""
) {
  this.isEmpty();
} else {
  this.dataServise.postValue('payment', dataObj).subscribe(
    (res: any) => {
      if (res.errorMessage) {
        this.loading = false;
      } else {
        this.UpdatedateDialogBoxOpen()
        this.loading = false;
      }
    },
    (e) => {
      this.loading = false;
      this.showError()
    }
  );
}
    // connectionId: connectionId, amount: amount,arreardate:arreardate
    // var Ctype: string = first.type
    // var url = findTypeUrl(Ctype)

    // var cInput: String = first.searchinginput
    // this.dataServise.getData(`animal`).subscribe((res) => {
    //   this.userData = res[0];
    //   this.tableResult = this.userData.length
    //   this.showTable = true;
     
    // }, (err) => {
    //   this.NoDataDialogBoxOpen()
    // });


  }
  // UpdateDataComponent
  NoDataDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(NoDataComponent, {
      width: '250px',
      data: { id: "PKA0001", animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  UpdatedateDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '250px',
      data: { id: "PKA0001", animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  showSuccess() {
    this.toastr.success('Sucessfully Finished', 'Sucessfully');
    window.location.reload()

  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
}
