import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CommonMatModuleModule } from '../common-mat-module/common-mat-module.module';
import { CommonComponentsModule } from '../common-components/common-components.module';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    CommonMatModuleModule,
    CommonComponentsModule,

  ]
})
export class AuthenticationModule { }
