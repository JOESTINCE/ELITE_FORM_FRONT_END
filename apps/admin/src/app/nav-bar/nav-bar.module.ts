import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule
  ]
})
export class NavBarModule { }
