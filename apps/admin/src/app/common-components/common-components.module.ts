import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';



@NgModule({
  declarations: [
    CommonHeaderComponent,
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    
  ]
})
export class CommonComponentsModule { }
