import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoDataComponent } from 'src/app/core/dialogBox/pending/no-data/no-data.component';
import { UpdateDataComponent } from 'src/app/core/dialogBox/pending/update-data/update-data.component';
import { HttpService } from 'src/app/servise/http/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.scss'],
})
export class AddRentalComponent {
  animal: string | any;
  name: string | any;
  userData: any;
  errmsg: string | any;

  showTable: boolean = false;
  tableResult: any;
  public loading: Boolean = true;
  maxDate: string | any;

  constructor(
    private fb: FormBuilder,
    public dataServise: HttpService,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public datepipe: DatePipe
  ) {}
  searching(first: Object | any) {
    var connectionId = first.connectionId;
    var amount = first.amount;
    var arreardate = first.arreardate;
    var loginForm = first.loginForm;

    let currentDateTime = this.datepipe.transform(
      new Date(),
      'yyyy-MM-dd h:mm:ss'
    );

    let currentMonth: any = new Date().getMonth() + 1;
    if (currentMonth == 1) {
      currentMonth = 'JANUARY';
    } else if (currentMonth == 2) {
      currentMonth = 'FEBUARY';
    } else if (currentMonth == 3) {
      currentMonth = 'MARCH';
    } else if (currentMonth == 4) {
      currentMonth = 'APRIL';
    } else if (currentMonth == 5) {
      currentMonth = 'MAY';
    } else if (currentMonth == 6) {
      currentMonth = 'JUNE';
    } else if (currentMonth == 7) {
      currentMonth = 'JULY';
    } else if (currentMonth == 8) {
      currentMonth = 'AUGUST';
    } else if (currentMonth == 9) {
      currentMonth = 'SEPTEMBER';
    } else if (currentMonth == 10) {
      currentMonth = 'OCTOBER';
    } else if (currentMonth == 11) {
      currentMonth = 'NOVEMBER';
    } else if (currentMonth == 12) {
      currentMonth = 'DECEMBER';
    }

    var admin = JSON.parse(localStorage.getItem('auth') || '{}');
    var adminId = admin ? admin.id : null;

    let dataObj = {
      connectionID: connectionId,
      paidDateTime: currentDateTime,
      description: currentMonth,
      paymentType: 'RENTAL.',
      amount: amount,
      enteredBy: adminId,
      conductedBy: adminId,
    };
    if (
      dataObj.amount == '' ||
      dataObj.connectionID == '' ||
      dataObj.paidDateTime == ''
    ) {
      this.isEmpty();
    } else {
      this.dataServise.postValue('payment/rental', dataObj).subscribe(
        (res: any) => {
          if (res.errorMessage) {
            this.loading = false;
          } else {
            this.UpdatedateDialogBoxOpen();
            this.loading = false;
            loginForm.reset();
          }
        },
        (e) => {
          this.loading = false;
          this.isWrongConnectionId();
        }
      );
    }
  }
  // UpdateDataComponent
  NoDataDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(NoDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  UpdatedateDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '250px',
      data: { id: 'PKA0001', animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  showSuccess() {
    this.toastr.success('Sucessfully Finished', 'Sucessfully');
    window.location.reload();
  }
  showError() {
    this.toastr.error('Someting Went Wrong', 'Error');
  }
  isEmpty() {
    this.toastr.error('Fill All The Field', 'Error');
  }
  isWrongConnectionId() {
    this.toastr.error('Check the Connection ID', 'Error');
  }
}
