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
import { DialogBoxComponent } from '../core/dialogBox/dialog-box/dialog-box.component';
import { ChangeRequestComponent } from '../core/dialogBox/change-request/change-request.component';
import { ExtraRequestDialogBoxComponent } from '../core/dialogBox/extra-request-dialog-box/extra-request-dialog-box.component';
import { PendingDetailsComponent } from './ticket/pending-ticket/pending-details/pending-details.component';
import { PendingChangeRequestComponent } from '../core/dialogBox/pending/assign-request/change-request.component';
import { CancelDialogBoxComponent } from '../core/dialogBox/pending/cancel-dialog-box/dialog-box.component';

@NgModule({
  declarations: [ CardTemplateComponent, TableComponent, DashboardComponent,
     AdminsComponent, CreateTicketComponent, EditTicketComponent, PendingTicketComponent,
      PendingOneTicketComponent,CustomButtonComponent,FilterBoxComponent,DialogBoxComponent,
      ExtraRequestDialogBoxComponent, ChangeRequestComponent, PendingDetailsComponent,PendingChangeRequestComponent,CancelDialogBoxComponent],
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
