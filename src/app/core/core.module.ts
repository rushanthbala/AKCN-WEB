import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTemplateComponent } from './card-template/card-template.component';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { DialogBoxComponent } from './dialogBox/dialog-box/dialog-box.component';
import { NavSideBarButtonComponent } from './nav-side-bar-button/nav-side-bar-button.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ChangeRequestComponent } from './dialogBox/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from './dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { ConnectionSearchComponent } from './connection-search/connection-search.component';
import { UpdateDataComponent } from './dialogBox/pending/update-data/update-data.component';
import { UserReportUpdateComponent } from './user-report-update/user-report-update.component';
import { ReconnectDialogComponent } from './dialogBox/connection/reconnect-dialog/reconnect-dialog.component';

@NgModule({
  declarations: [DialogBoxComponent, ExtraRequestDialogBoxComponent, ChangeRequestComponent, NavSideBarButtonComponent, 
    FilterBoxComponent, CustomButtonComponent, ChangeRequestComponent, ExtraRequestDialogBoxComponent, ConnectionSearchComponent,
     UpdateDataComponent, UserReportUpdateComponent, ReconnectDialogComponent],
  imports: [CommonModule, BrowserModule],
  entryComponents: [CardTemplateComponent],
})
export class CoreModule { }
