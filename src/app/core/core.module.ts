import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTemplateComponent } from './card-template/card-template.component';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NavSideBarButtonComponent } from './nav-side-bar-button/nav-side-bar-button.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';

@NgModule({
  declarations: [DialogBoxComponent, NavSideBarButtonComponent, FilterBoxComponent, CustomButtonComponent],
  imports: [CommonModule, BrowserModule],
  entryComponents: [CardTemplateComponent],
})
export class CoreModule {}
