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

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
