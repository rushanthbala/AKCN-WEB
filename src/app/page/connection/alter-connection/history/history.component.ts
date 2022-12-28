import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servise/http/http.service';
import { findTypeUrl } from 'src/app/servise/utils/function';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit{
  loginForm: any;
  inputset: any;
  Change: any;
  Extra: any;
  Reconnection: any;
  object: any;
  userData: any = [];
  ifGetdata: boolean = false;
  suburl: string = 'connection';

  constructor(
    private activateRouter: ActivatedRoute,
    public dataServise: HttpService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.openReconnectBigDialog()
    this.initialForm();
    this.initialInputForm();
    this.initialReconnectionForm();
    this.initialExtraForm();
    this.initialChangeForm();
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

  details(id: any) {
    this.dataServise.getData(`connection/id/${id}`).subscribe((res) => {
      this.userData = res;
      console.log(this.userData)
      this.ifGetdata = true;
    },(err)=>{
      this.ifGetdata = true;
    });
  }

 
 
}
