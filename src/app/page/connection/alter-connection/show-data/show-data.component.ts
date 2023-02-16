import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditConnectionDialogComponent } from 'src/app/core/dialogBox/connection/edit-connection-dialog/edit-connection-dialog.component';
import { EditSubscriberDialogComponent } from 'src/app/core/dialogBox/connection/edit-subscriber-dialog/edit-subscriber-dialog.component';
import { ReconnectBigDialogComponent } from 'src/app/core/dialogBox/connection/change-location-big-dialog/reconnect-big-dialog.component';
import { ReconnectDialogComponent } from 'src/app/core/dialogBox/connection/disconnect-dialog/reconnect-dialog.component';
import { ConnectDialogComponent } from 'src/app/core/dialogBox/connection/connect-dialog/connect-dialog.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss'],
})
export class ShowDataComponent implements OnInit {
  animal: string | any;
  name: string | any;
  connectionId: any;
  public longitude: any;
  public lattitute: any;
  url: any = `https://maps.google.com/maps?q=9.6778336,80.0034365&hl=es;z=14`;

  // this.url =`https://maps.google.com/maps?q=9.6778336,80.0034365&hl=es;z=14&amp;output=embed`

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {}
  @Input() object: object | any;
  @Input() text: string | any;
  // url: string = "https://maps.google.com/maps?q=9.6778336,80.0034365&hl=es;z=14&amp;output=embed";
  urlSafe: SafeResourceUrl | any;
  loginForm: FormGroup | any;
  inputset: FormGroup | any;

  // model forms
  Reconnection: FormGroup | any;
  Change: FormGroup | any;
  Extra: FormGroup | any;

  ngOnInit(): void {
    // this.openReconnectBigDialog()
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
    let xy = this.object.connectionLocation;
    var split_str = xy?.split(',');
    // this.longitude= split_str[0]
    // this.lattitute= split_str[1]
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
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

  openReconnectDialog(): void {
    const dialogRef = this.dialog.open(ReconnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.animal = result;
    });
  }
  openChangeLocationDialog(): void {
    const dialogRef = this.dialog.open(ReconnectBigDialogComponent, {
      width: '550px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.animal = result;
    });
  }

  editSubscriber(): void {
    const dialogRef = this.dialog.open(EditSubscriberDialogComponent, {
      width: '550px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  editConnection(): void {
    const dialogRef = this.dialog.open(EditConnectionDialogComponent, {
      width: '600px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  // DisconnectDialogBoxComponent
  DisconnectDialog(): void {
    const dialogRef = this.dialog.open(ReconnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
  ConnectDialog(): void {
    const dialogRef = this.dialog.open(ConnectDialogComponent, {
      width: '250px',
      data: this.object,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }

  viewDetails(id: any) {
    this.router.navigate([`auth/alter-connection/history/${id.id}`]);
  }
}
