import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFormsComponent } from './forms/components/add-edit-forms/add-edit-forms.component';
import { NavBarComponent } from './nav-bar/components/nav-bar/nav-bar.component';
import { FormsListComponent } from './forms/components/forms-list/forms-list.component';
import { DisplayFormComponent } from './display-form/components/display-form/display-form.component';
import { SignInComponent } from './authentication/components/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { CommonChartComponent } from './common-components/components/common-chart/common-chart.component';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { ResponseListComponent } from './forms/components/response-list/response-list.component';
import { FormEditorComponent } from './forms/components/form-editor/form-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {path:'app', component: NavBarComponent, children:[
    { path: 'addeditform', component: AddEditFormsComponent },
    { path: 'addeditform/:id', component: AddEditFormsComponent },
    { path: 'formlist', component: FormsListComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'responselist', component: ResponseListComponent}
  ]},
  { path: 'form/:id', component: DisplayFormComponent },
  {path:'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'editor/:id', component: FormEditorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
