import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';
import { findTypeUrl } from 'src/app/servise/utils/function';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent implements OnInit {
  constructor(private fb: FormBuilder, public dataServise: HttpService,
  ) { }
  loginForm: FormGroup | any;
  tableDatasetsData: any;
  tableDatasetsDate: any;
  userData: any=[];
  // after posting
  loading: boolean = true;
  errmsg: string = ""
  sucmsg: string = ""
  suburl: string = "connection"
  // table variable
  showTable: boolean = false;
  subscriberdata:any={};
  isSubscriberdata:boolean=false;
  tableResult: any;
  
 
  p: number = 1;

  ngOnInit(): void {
  }
  searching(first: Object | any) {
    var Ctype: string = first.type
    var url = findTypeUrl(Ctype)

    var cInput: String = first.searchinginput
    this.dataServise.getData(`${this.suburl}/${url}/${cInput}`).subscribe((res) => {
      this.userData = res;
      this.tableResult =this.userData.length
    });
    this.showTable = true;
  }
  viewDetails(us:any) {
    this.showTable = false;
    this.subscriberdata=us;
    this.isSubscriberdata=true;
    console.log(us);
    
  }
}
