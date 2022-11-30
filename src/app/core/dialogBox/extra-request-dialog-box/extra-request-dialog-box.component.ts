import {Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-extra-request-dialog-box',
  templateUrl: './extra-request-dialog-box.component.html',
  styleUrls: ['./extra-request-dialog-box.component.scss']
})
export class ExtraRequestDialogBoxComponent implements OnInit {

  public open: Boolean = true;
  Reconnection: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<ExtraRequestDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      phoneNumber: ''
    });
  }
  ReconnectionRequest() {
    console.log(this.Reconnection.value);
  }

}
