import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonMatModuleModule } from './common-mat-module/common-mat-module.module';
import { AddEditFormsComponent } from './forms/components/add-edit-forms/add-edit-forms.component';
import { NavBarComponent } from './nav-bar/components/nav-bar/nav-bar.component';
import { CommonHeaderComponent } from './common-components/components/common-header/common-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditFormsComponent,
    NavBarComponent,
    CommonHeaderComponent
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
