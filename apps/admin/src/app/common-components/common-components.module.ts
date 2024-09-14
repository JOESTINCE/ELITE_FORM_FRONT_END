import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';
import { CommonChartComponent } from './components/common-chart/common-chart.component';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import { CommonButtonLoaderComponent } from './components/common-button-loader/common-button-loader.component';
import { CommonPageLoaderComponent } from './components/common-page-loader/common-page-loader.component';
Chart.register(...registerables);



@NgModule({
  declarations: [
    CommonHeaderComponent,
    CommonTableComponent,
    CommonChartComponent,
    CommonButtonLoaderComponent,
    CommonPageLoaderComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    
  ]
})
export class CommonComponentsModule { }
