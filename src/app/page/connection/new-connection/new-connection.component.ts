import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/servise/http/http.service';

@Component({
  selector: 'app-new-connection',
  templateUrl: './new-connection.component.html',
  styleUrls: ['./new-connection.component.scss']
})
export class NewConnectionComponent {
  userData: any;
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

  constructor(private fb: FormBuilder, public dataServise: HttpService,
    ) { }
  searching(first: Object | any) {
    // var url = findTypeUrl(Ctype)

    var cInput: String = first.searchinginput
    // alert(cInput)
    this.dataServise.getData(`connection/nic/${cInput}`).subscribe((res) => {
      this.userData = res[0];
      this.tableResult =this.userData.length
    });
    this.showTable = true;


  }
  addAnotherConnection(){
    alert("okoko")
  }
}
