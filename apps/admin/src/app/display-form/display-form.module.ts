import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayFormComponent } from './components/display-form/display-form.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';
import { CommonComponentsModule } from '../common-components/common-components.module';



@NgModule({
  declarations: [
    DisplayFormComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    CommonComponentsModule,
  ]
})
export class DisplayFormModule { }
