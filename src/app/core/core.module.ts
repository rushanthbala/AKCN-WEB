import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTemplateComponent } from './card-template/card-template.component';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { DialogBoxComponent } from './dialogBox/disconnect-dialog-box/dialog-box.component';
import { NavSideBarButtonComponent } from './nav-side-bar-button/nav-side-bar-button.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ChangeRequestComponent } from './dialogBox/request/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from './dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { ConnectionSearchComponent } from './connection-search/connection-search.component';
import { UpdateDataComponent } from './dialogBox/pending/update-data/update-data.component';
import { UserReportUpdateComponent } from './report/user-report-update/user-report-update.component';
import { ReconnectDialogComponent } from './dialogBox/connection/disconnect-dialog/reconnect-dialog.component';
import { RoleDialogComponent } from './dialogBox/settings/role-dialog/role-dialog.component';
import { RoadDialogComponent } from './dialogBox/settings/road-dialog/road-dialog.component';
import { AreaDialogComponent } from './dialogBox/settings/area-dialog/area-dialog.component';
import { BranchDialogComponent } from './dialogBox/settings/branch-dialog/branch-dialog.component';
import { CollectionReportUpdateComponent } from './report/collection-report-update/collection-report-update.component';
import { UnpaidReportUpdateComponent } from './report/unpaid-report-update/unpaid-report-update.component';
import { CollectionReportTableComponent } from './reportTable/collection-report-table/collection-report-table.component';
import { DueReportTableComponent } from './reportTable/due-report-table/due-report-table.component';
import { UserReportTableComponent } from './reportTable/user-report-table/user-report-table.component';
import { UnpaidReportTableComponent } from './reportTable/unpaid-report-table/unpaid-report-table.component';
import { PaymentFilterComponent } from './payment-filter/payment-filter.component';
import { UpdatePaymentComponent } from './payment/update-payment/update-payment.component';
import { AdjustPaymentUpdateComponent } from './adjust-payment-update/adjust-payment-update.component';

@NgModule({
  declarations: [DialogBoxComponent, ExtraRequestDialogBoxComponent, ChangeRequestComponent, NavSideBarButtonComponent, 
    FilterBoxComponent, CustomButtonComponent, ChangeRequestComponent, ExtraRequestDialogBoxComponent, ConnectionSearchComponent,
     UpdateDataComponent, UserReportUpdateComponent, ReconnectDialogComponent, RoleDialogComponent, RoadDialogComponent, AreaDialogComponent, BranchDialogComponent, CollectionReportUpdateComponent, UnpaidReportUpdateComponent, CollectionReportTableComponent, DueReportTableComponent, UserReportTableComponent, UnpaidReportTableComponent, PaymentFilterComponent, UpdatePaymentComponent, AdjustPaymentUpdateComponent],
  imports: [CommonModule, BrowserModule],
  entryComponents: [CardTemplateComponent],
})
export class CoreModule { }
