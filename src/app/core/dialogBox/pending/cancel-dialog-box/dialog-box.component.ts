import {Component, Inject,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class CancelDialogBoxComponent  implements OnInit  {
  public open: Boolean = true;
  Reconnection: FormGroup | any;
  ngOnInit(): void {
    this.initialReconnectionForm();
  }
  constructor(
    public dialogRef: MatDialogRef<CancelDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  initialReconnectionForm() {
    this.Reconnection = this.fb.group({
      Remark: ''
    });
  }
  ReconnectionRequest() {
    console.log(this.Reconnection.value);
  }
}
export interface DialogData {
  animal: string;
  id: string;
  
}

















