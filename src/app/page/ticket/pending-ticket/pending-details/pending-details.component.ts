import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssignTicketRequestDilogComponent } from 'src/app/core/dialogBox/ticket/assign-ticket-request/assign-ticket-request.component';
import { TicketCancelDialogBoxComponent } from 'src/app/core/dialogBox/ticket/cancel-dialog-box/ticket-cancel-dialog-box.component';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.scss'],
})
export class PendingDetailsComponent {
  animal: string | any;
  name: string | any;
  allData: object | any;
  TotalObjectData: [] | any;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dataServise: HttpService
  ) {}
  @Input() object: object | any;
  @Input() text: string | any;
  @Output() backTo = new EventEmitter<any>();

  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;

  ngOnInit(): void {
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
    this.getUserSingleData();
  }

  initialForm() {
    this.loginForm = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialInputForm() {
    this.inputset = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialChangeForm() {
    this.Change = this.fb.group({
      searchinginput: '',
      type: '',
    });
  }
  initialExtraForm() {
    this.Extra = this.fb.group({
      numberOfTV: '',
      phoneNumber: '',
    });
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      phoneNumber: '',
      address: '',
      area: '',
      road: '',
    });
  }

  getUserSingleData() {
    this.dataServise
      .getData(`connection/id/${this.object.connectionID}`)
      .subscribe(
        (res) => {
          this.allData = res[0];
        },
        (err) => {}
      );
  }
  AssignOpenDialog(): void {
    let TotalObjectData = this.TotalObjectData;
    let allData = this.allData;
    const dialogRef = this.dialog.open(AssignTicketRequestDilogComponent, {
      width: '250px',
      data: { TicketData: this.object, allData: this.allData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }

  CancelTicket(): void {
    const dialogRef = this.dialog.open(TicketCancelDialogBoxComponent, {
      width: '250px',
      data: { TicketData: this.object, allData: this.allData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  Back() {
    this.backTo.emit();
    window.location.reload()
  }
}
