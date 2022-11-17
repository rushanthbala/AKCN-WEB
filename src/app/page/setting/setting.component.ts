import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/servise/setting/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  constructor(public dataServise:SettingService) { }

  ngOnInit(): void {
  }

  


}
