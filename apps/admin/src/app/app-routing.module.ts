import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFormsComponent } from './forms/components/add-edit-forms/add-edit-forms.component';
import { NavBarComponent } from './nav-bar/components/nav-bar/nav-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {path:'app', component: NavBarComponent, children:[
    { path: 'addeditform', component: AddEditFormsComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
