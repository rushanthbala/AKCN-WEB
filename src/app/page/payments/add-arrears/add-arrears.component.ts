import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, public dataServise: HttpService, public dialog: MatDialog
  ) { }
  searching(first: Object | any) {
    var connectionId = first.connectionId
    var amount = first.amount
    var arreardate = first.arreardate
    console.log(connectionId, amount, arreardate);

    // connectionId: connectionId, amount: amount,arreardate:arreardate
    // var Ctype: string = first.type
    // var url = findTypeUrl(Ctype)

    // var cInput: String = first.searchinginput
    this.dataServise.getData(`animal`).subscribe((res) => {
      this.userData = res[0];
      this.tableResult = this.userData.length
      this.showTable = true;
      this.UpdatedateDialogBoxOpen()
    }, (err) => {
      this.NoDataDialogBoxOpen()
    });
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
}
