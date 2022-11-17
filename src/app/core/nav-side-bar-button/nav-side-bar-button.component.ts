import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-side-bar-button',
  templateUrl: './nav-side-bar-button.component.html',
  styleUrls: ['./nav-side-bar-button.component.scss'],
})
export class NavSideBarButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
export interface CollapsibleItem {
  label: string;
  text: string;
  state: boolean;
}
