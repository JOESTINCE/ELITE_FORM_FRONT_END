import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonMatModuleModule } from './common-mat-module/common-mat-module.module';
import { AddEditFormsComponent } from './forms/components/add-edit-forms/add-edit-forms.component';
import { NavBarComponent } from './nav-bar/components/nav-bar/nav-bar.component';
import { CommonHeaderComponent } from './common-components/components/common-header/common-header.component';
import { FormsListComponent } from './forms/components/forms-list/forms-list.component';
import { CommonTableComponent } from './common-components/components/common-table/common-table.component';
import { DisplayFormComponent } from './display-form/components/display-form/display-form.component';
import { SignInComponent } from './authentication/components/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { CommonChartComponent } from './common-components/components/common-chart/common-chart.component';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpReqResInterceptor } from './authentication/services/http.interceptor'; // Import your function-based interceptor
import { CommonButtonLoaderComponent } from './common-components/components/common-button-loader/common-button-loader.component';
import { CommonPageLoaderComponent } from './common-components/components/common-page-loader/common-page-loader.component';
import { ResponseListComponent } from './forms/components/response-list/response-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditFormsComponent,
    FormsListComponent,
    NavBarComponent,
    CommonHeaderComponent,
    CommonTableComponent,
    DisplayFormComponent,
    SignInComponent,
    DashboardComponent,
    CommonChartComponent,
    SignUpComponent,
    CommonButtonLoaderComponent,
    CommonPageLoaderComponent,
    ResponseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonMatModuleModule,
  ],
  providers: [
    {provide: 'environment', useValue: environment},
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([httpReqResInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
