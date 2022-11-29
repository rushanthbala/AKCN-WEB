import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CardTemplateComponent } from '../core/card-template/card-template.component';
import { TableComponent } from '../core/table/table.component';
import { UserApiService } from '../servise/user-api.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

import { NgChartsModule } from 'ng2-charts';
import { CommentService } from '../servise/comment/comment.service';
import { ReplyCommentService } from '../servise/replyComment/reply-comment.service';
import { SettingService } from '../servise/setting//setting.service';
import { LoginService } from '../servise/login/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminsComponent } from './admins/admins.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { PendingTicketComponent } from './pending-ticket/pending-ticket.component';
import { PendingOneTicketComponent } from './pending-one-ticket/pending-one-ticket.component';
import { CustomButtonComponent } from '../core/custom-button/custom-button.component';
import { FilterBoxComponent } from '../core/filter-box/filter-box.component';

@NgModule({
  declarations: [ CardTemplateComponent, TableComponent, DashboardComponent,
     AdminsComponent, CreateTicketComponent, EditTicketComponent, PendingTicketComponent,
      PendingOneTicketComponent,CustomButtonComponent,FilterBoxComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UserApiService,
    CommentService,
    ReplyCommentService,
    SettingService,
    LoginService,
  ],
})
export class PagesModule {}
