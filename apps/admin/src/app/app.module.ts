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

@NgModule({
  declarations: [
    AppComponent,
    AddEditFormsComponent,
    FormsListComponent,
    NavBarComponent,
    CommonHeaderComponent,
    CommonTableComponent,
    DisplayFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonMatModuleModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
