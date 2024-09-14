import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditFormsComponent } from './components/add-edit-forms/add-edit-forms.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ResponseListComponent } from './components/response-list/response-list.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AddEditFormsComponent,
    FormsListComponent,
    ResponseListComponent,
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    CommonComponentsModule,
    DatePipe
  ]
})
export class FormsModule { }
