import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PendingOneTicketComponent } from './pending-one-ticket/pending-one-ticket.component';
import { PendingTicketComponent } from './pending-ticket/pending-ticket.component';

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
        path: 'pending-ticket/:id',
        component: PendingOneTicketComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
