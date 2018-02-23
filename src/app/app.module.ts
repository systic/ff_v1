import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { PageTitleService } from './services/page-title.service';
import { StoresService } from './services/stores.service';
import { DevicesService } from './services/devices.service';
import { UsersService } from './services/users.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { DemoVideoComponent } from './modals/demo-video/demo-video.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { DeviceManagementComponent } from './secure/device-management/device-management.component';
import { UserManagementComponent } from './secure/user-management/user-management.component';
import { SearchHeaderBarComponent } from './components/search-header-bar/search-header-bar.component';
import { AddUpdateDeviceComponent } from './secure/device-management/add-update-device/add-update-device.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { AlphanumericSortPipe } from './pipes/alphanumeric-sort.pipe';
import { AddUpdateUserComponent } from './secure/user-management/add-update-user/add-update-user.component';
import { SummaryComponent } from './secure/dashboard/summary/summary.component';
import { StoreInfoWindowComponent } from './secure/dashboard/store-info-window/store-info-window.component';
import { StoreSummaryComponent } from './secure/dashboard/store-summary/store-summary.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { environment } from '../environments/environment';
import { StoreDetailsComponent } from './modals/store-details/store-details.component';
import { TimeSeriesChartComponent } from './secure/dashboard/time-series-chart/time-series-chart.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const googleMapApiKey = environment.googleMapApiKey;

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageFooterComponent,
    CheckboxComponent,
    LoginComponent,
    PublicComponent,
    SecureComponent,
    DemoVideoComponent,
    PageHeaderComponent,
    DashboardComponent,
    DeviceManagementComponent,
    UserManagementComponent,
    SearchHeaderBarComponent,
    AddUpdateDeviceComponent,
    CustomSelectComponent,
    AlphanumericSortPipe,
    AddUpdateUserComponent,
    SummaryComponent,
    StoreInfoWindowComponent,
    StoreSummaryComponent,
    StoreDetailsComponent,
    TimeSeriesChartComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({
      apiKey: googleMapApiKey
    })
  ],
  entryComponents: [
    DemoVideoComponent,
    StoreDetailsComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    RoleGuardService,
    PageTitleService,
    StoresService,
    DevicesService,
    UsersService,
    AlphanumericSortPipe,
    SearchFilterPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
