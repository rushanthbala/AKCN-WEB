import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTicketComponent } from './ticket/create-ticket/edit-ticket/edit-ticket.component';
import { PagesComponent } from './pages.component';
import { PendingOneTicketComponent } from './pending-one-ticket/pending-one-ticket.component';
import { PendingTicketComponent } from './ticket/pending-ticket/pending-ticket.component';
import { AssignTicketComponent } from './ticket/assign-ticket/assign-ticket.component';
import { ClosedTicketComponent } from './ticket/closed-ticket/pending-ticket.component';
import { CancelledTicketComponent } from './ticket/cancelled-ticket/pending-ticket.component';
import { NewConnectionComponent } from './connection/new-connection/new-connection.component';
import { AlterConnectionComponent } from './connection/alter-connection/alter-connection.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { AddArrearsComponent } from './payments/add-arrears/add-arrears.component';
import { UserReportComponent } from './reports/user-report/user-report.component';
import { UsersSettingComponent } from './settings/users-setting/users-setting.component';
import { CreateRequestComponent } from './requests/create-request/create-request.component';
import { PendingRequestComponent } from './requests/pending-request/pending-request.component';
import { AssignRequestComponent } from './requests/assign-request/assign-request.component';
import { CloseRequestComponent } from './requests/closed-request/close-request.component';
import { CancelledRequestComponent } from './requests/cancelled-request/cancel-request.component';
import { AllConnectionComponent } from './connection/all-connection/all-connection.component';
import { RoleSettingComponent } from './settings/role-settings/role-settings.component';
import { RoadSettingsComponent } from './settings/road-settings/road-settings.component';
import { AreaSettingsComponent } from './settings/area-settings/area-settings.component';
import { BranchSettingsComponent } from './settings/branch-settings/branch-settings.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'create-ticket',
        component: CreateTicketComponent,
      },
      {
        path: 'create-ticket/:id',
        component: EditTicketComponent,
      },
      {
        path: 'pending-ticket',
        component: PendingTicketComponent,
      },
      {
        path: 'assign-ticket',
        component: AssignTicketComponent,
      },
      {
        path: 'closed-ticket',
        component: ClosedTicketComponent,
      },
      {
        path: 'cancelled-ticket',
        component: CancelledTicketComponent,
      },
      {
        path: 'new-connection',
        component: NewConnectionComponent,
      },
      {
        path: 'alter-connection',
        component: AlterConnectionComponent,
      },
      {
        path: 'make-payment',
        component: MakePaymentComponent,
      },
      {
        path: 'add-arrears',
        component: AddArrearsComponent,
      },
      {
        path: 'user-report',
        component: UserReportComponent,
      },
      {
        path: 'users-setting',
        component: UsersSettingComponent,
      },

      // request
      {
        path: 'create-request',
        component: CreateRequestComponent,
      },
      {
        path: 'pending-request',
        component: PendingRequestComponent,
      },
      {
        path: 'assign-request',
        component: AssignRequestComponent,
      },
      {
        path: 'closed-request',
        component: CloseRequestComponent,
      },
      {
        path: 'cancelled-request',
        component: CancelledRequestComponent,
      },
      {
        path: 'all-connection',
        component: AllConnectionComponent,
      },
      {
        path: 'roles-setting',
        component: RoleSettingComponent,
      },
      {
        path: 'roads-setting',
        component: RoadSettingsComponent,
      },
      {
        path: 'areas-setting',
        component: AreaSettingsComponent,
      },
      {
        path:'branches-setting',
        component: BranchSettingsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
