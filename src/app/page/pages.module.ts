import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CardTemplateComponent } from '../core/card-template/card-template.component';
import { TableComponent } from '../core/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { NgChartsModule } from 'ng2-charts';
import { LoginService } from '../servise/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { EditTicketComponent } from './ticket/create-ticket/edit-ticket/edit-ticket.component';
import { PendingTicketComponent } from './ticket/pending-ticket/pending-ticket.component';
import { PendingOneTicketComponent } from './pending-one-ticket/pending-one-ticket.component';
import { CustomButtonComponent } from '../core/custom-button/custom-button.component';
import { FilterBoxComponent } from '../core/filter-box/filter-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialExampleModule } from './material.module';
// import { DialogBoxComponent } from '../core/dialogBox/disconnect-dialog-box/dialog-box.component';
import { ChangeRequestComponent } from '../core/dialogBox/request/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from '../core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingDetailsComponent } from './ticket/pending-ticket/pending-details/pending-details.component';
import { PendingChangeRequestComponent } from '../core/dialogBox/request/assign-request/change-request.component';
import { CancelDialogBoxComponent } from '../core/dialogBox/request/cancel-dialog-box/dialog-box.component';
import { AssignTicketComponent } from './ticket/assign-ticket/assign-ticket.component';
import { AssignDetailsComponent } from './ticket/assign-ticket/pending-details/assign-details.component';
import { ClosedTicketComponent } from './ticket/closed-ticket/pending-ticket.component';
import { CancelledTicketComponent } from './ticket/cancelled-ticket/pending-ticket.component';
import { CancelledDetailsComponent } from './ticket/cancelled-ticket/pending-details/pending-details.component';
import { ClosedRequestComponent } from '../core/dialogBox/request/close-request/closed-request.component';
import { NewConnectionComponent } from './connection/new-connection/new-connection.component';
import { ConnectionSearchComponent } from '../core/connection-search/connection-search.component';
import { SubscriberDetailsComponent } from './connection/new-connection/subscriber-details/subscriber-details.component';
import { NoDataComponent } from '../core/dialogBox/pending/no-data/no-data.component';
import { AddConnectionComponent } from './connection/new-connection/add-connection/add-connection.component';
import { AlterConnectionComponent } from './connection/alter-connection/alter-connection.component';
import { ConnectionDetailsComponent } from './connection/alter-connection/connection-details/connection-details.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { MakePaymentDetailsComponent } from './payments/make-payment/make-payment-details/make-payment-details.component';
import { AddArrearsComponent } from './payments/add-arrears/add-arrears.component';
import { PaymentUpdateComponent } from '../core/payment-update/payment-update.component';
import { UpdateDataComponent } from '../core/dialogBox/pending/update-data/update-data.component';
import { UserReportComponent } from './reports/user-report/user-report.component';
import { UserReportUpdateComponent } from '../core/user-report-update/user-report-update.component';
import { UsersSettingComponent } from './settings/users-setting/users-setting.component';
import { ReconnectDialogComponent } from '../core/dialogBox/connection/disconnect-dialog/reconnect-dialog.component';
import { ReconnectBigDialogComponent } from '../core/dialogBox/connection/change-location-big-dialog/reconnect-big-dialog.component';
import { EditConnectionDialogComponent } from '../core/dialogBox/connection/edit-connection-dialog/edit-connection-dialog.component';
import { EditSubscriberDialogComponent } from '../core/dialogBox/connection/edit-subscriber-dialog/edit-subscriber-dialog.component';
import { ApplyDiscountDialogBoxComponent } from '../core/dialogBox/payment/apply-discount-dialog-box/apply-discount-dialog-box.component';
import { UpdatePaymentComponent } from '../core/dialogBox/payment/make-payment/update-payment.component';
import { CreateTicketComponentDialog } from '../core/dialogBox/ticket/create-ticket/create-ticket.component';
import { AssignRequestDetailsComponent } from './requests/assign-request/pending-details/assign-request-details.component';
import { AssignRequestComponent } from './requests/assign-request/assign-request.component';
import { EditRequestComponent } from './requests/create-request/edit-ticket/edit-request.component';
import { CreateRequestComponent } from './requests/create-request/create-request.component';
import { PendingRequestDetailsComponent } from './requests/pending-request/pending-request-details/pending-request-details.component';
import { PendingRequestComponent } from './requests/pending-request/pending-request.component';
import { CloseRequestDetailsComponent } from './requests/closed-request/close-request-details/close-request-details.component';
import { CloseRequestComponent } from './requests/closed-request/close-request.component';
import { CancelledRequestComponent } from './requests/cancelled-request/cancel-request.component';
import { CancelledRequestDetailsComponent } from './requests/cancelled-request/cancel-request-details/cancel-request-details.component';
import { TicketCancelDialogBoxComponent } from '../core/dialogBox/ticket/cancel-dialog-box/ticket-cancel-dialog-box.component';
import { AssignTicketRequestDilogComponent } from '../core/dialogBox/ticket/assign-ticket-request/assign-ticket-request.component';
import { TicketCloseDialogBoxComponent } from '../core/dialogBox/ticket/close-dialog-box/ticket-close-dialog-box.component';
import { DialogBoxComponent } from '../core/dialog-box/dialog-box.component';
import { DisconnectDialogBoxComponent } from '../core/dialogBox/disconnect-dialog-box/dialog-box.component';
import { AddCSubsciberComponent } from './connection/new-connection/add-subscriber/add-subscriber.component';
import { AllConnectionComponent } from './connection/all-connection/all-connection.component';
import { UserPostPut } from '../core/dialogBox/settings/user-dialog/user-dialog.component';
import { RoleSettingComponent } from './settings/role-settings/role-settings.component';
import { RoleDialogComponent } from '../core/dialogBox/settings/role-dialog/role-dialog.component';
import { RoadDialogComponent } from '../core/dialogBox/settings/road-dialog/road-dialog.component';
import { AreaDialogComponent } from '../core/dialogBox/settings/area-dialog/area-dialog.component';
import { BranchDialogComponent } from '../core/dialogBox/settings/branch-dialog/branch-dialog.component';
import { RoadSettingsComponent } from './settings/road-settings/road-settings.component';
import { AreaSettingsComponent } from './settings/area-settings/area-settings.component';
import { BranchSettingsComponent } from './settings/branch-settings/branch-settings.component';
import { ConnectDialogComponent } from '../core/dialogBox/connection/connect-dialog/connect-dialog.component';
import { AddRentalComponent } from './payments/add-rental/add-rental.component';

@NgModule({
  declarations: [ CardTemplateComponent, TableComponent, DashboardComponent,
     AdminsComponent, CreateTicketComponent, EditTicketComponent, PendingTicketComponent,
      PendingOneTicketComponent,CustomButtonComponent,FilterBoxComponent,DialogBoxComponent,
      ChangeRequestComponent, PendingDetailsComponent,
      PendingChangeRequestComponent,CancelDialogBoxComponent,AssignTicketComponent,
      AssignDetailsComponent,ClosedTicketComponent,CancelledTicketComponent,CancelledDetailsComponent,ClosedRequestComponent,
       NewConnectionComponent,ConnectionSearchComponent, SubscriberDetailsComponent,NoDataComponent, 
       AddConnectionComponent, AlterConnectionComponent, ConnectionDetailsComponent, MakePaymentComponent,
        MakePaymentDetailsComponent, AddArrearsComponent,
        PaymentUpdateComponent,UpdateDataComponent, UserReportComponent,UserReportUpdateComponent, UsersSettingComponent,
        ReconnectDialogComponent,ReconnectBigDialogComponent,EditConnectionDialogComponent,EditSubscriberDialogComponent,
        ApplyDiscountDialogBoxComponent,UpdatePaymentComponent,CreateTicketComponentDialog,
        AssignRequestDetailsComponent,AssignRequestComponent,EditRequestComponent,CreateRequestComponent,
        PendingRequestDetailsComponent,PendingRequestComponent,CloseRequestDetailsComponent,
        CloseRequestComponent,CancelledRequestDetailsComponent,CancelledRequestComponent,TicketCancelDialogBoxComponent,
        AssignTicketRequestDilogComponent,TicketCloseDialogBoxComponent,DisconnectDialogBoxComponent, ExtraRequestDialogBoxComponent,
        AddCSubsciberComponent,AllConnectionComponent,UserPostPut,RoleSettingComponent, RoleDialogComponent, RoadDialogComponent,
        AreaDialogComponent, BranchDialogComponent, RoadSettingsComponent, AreaSettingsComponent, BranchSettingsComponent,
        ConnectDialogComponent,AddRentalComponent
      ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialExampleModule
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [DialogBoxComponent],
})
export class PagesModule {}
