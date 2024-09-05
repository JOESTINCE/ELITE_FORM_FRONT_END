import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    CommonComponentsModule,

  ]
})
export class DashboardModule { }
