import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditFormsComponent } from './components/add-edit-forms/add-edit-forms.component';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';
import { CommonComponentsModule } from '../common-components/common-components.module';



@NgModule({
  declarations: [
    AddEditFormsComponent,
    FormsListComponent,
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    CommonComponentsModule,
  ]
})
export class FormsModule { }
