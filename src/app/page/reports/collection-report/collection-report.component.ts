import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NoDataComponent } from 'src/app/core/dialogBox/pending/no-data/no-data.component';
import { UpdateDataComponent } from 'src/app/core/dialogBox/pending/update-data/update-data.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss']
})
export class CollectionReportComponent {

  animal: string | any;
  name: string | any;
  userData: any;
  showTable: boolean = false;
  tableResult: any;

  constructor(private fb: FormBuilder, public dataServise: HttpService, public dialog: MatDialog
  ) { }
  searching(first: Object | any) {
    // var connectionId = first.connectionId
    // var amount = first.amount
    // var arreardate = first.arreardate
    // console.log(connectionId, amount, arreardate);

    // connectionId: connectionId, amount: amount,arreardate:arreardate
    // var Ctype: string = first.type
    // var url = findTypeUrl(Ctype)

    // var cInput: String = first.searchinginput
    console.log(first, 'first')
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

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  UpdatedateDialogBoxOpen(): void {
    const dialogRef = this.dialog.open(UpdateDataComponent, {
      width: '250px',
      data: { id: "PKA0001", animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}