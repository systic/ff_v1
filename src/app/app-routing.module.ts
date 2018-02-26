import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

import { PublicComponent } from './layouts/public/public.component';
import { LoginComponent } from './public/login/login.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { DeviceManagementComponent } from './secure/device-management/device-management.component';
import { UserManagementComponent } from './secure/user-management/user-management.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PublicComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: SecureComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        canActivateChild: [RoleGuardService],
        children: [
          {
            path: 'device-management',
            component: DeviceManagementComponent
          },
          {
            path: 'user-management',
            component: UserManagementComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
