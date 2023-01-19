import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuardGuard } from './authentication-guard.guard';
import { ForgotpasswordComponent } from './page/forgotpassword/forgotpassword.component';
import { OtpComponent } from './page/otp/otp.component';
import { ReEnterpasswordComponent } from './page/re-enterpassword/re-enterpassword.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./page/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthenticationGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent
  },
  {
    path:'otp',
    component:OtpComponent
  },
  {
    path:'reEnterPassword',
    component:ReEnterpasswordComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  // LoginComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
