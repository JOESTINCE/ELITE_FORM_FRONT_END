import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,
    MatSidenavContent,
    MatCardModule
  ],
  exports:[
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavContent,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,
    MatCardModule
  ]
})
export class CommonMatModuleModule { }
