import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';
import { SignInService } from '../../services/sign-in.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm!:any;
  subscriptionObj: Subscription = new Subscription();
constructor(
  private router: Router,
  private signInService : SignInService,
  private snackBar: MatSnackBar
){

}
ngOnInit(){
  this.signInFormInitialization();
}
onLogin(){
  if(this.signInForm?.valid){
    this.subscriptionObj.add(this.signInService.signInUser(this.signInForm.value).subscribe({
      next: (res: any)=>{
        if(res?.data?.message==='LOGIN_SUCCESSFUL'){
          this.snackBar.open('Login successful', 'okay', {
            duration: 2000,
            panelClass: ['green-snack-bar']
          });
          this.router.navigate(['/app/dashboard']);
        }
        else{
          this.snackBar.open('Invalid credentials', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
        }
      },
      error: (error: any)=>{
        this.snackBar.open('Error in login', 'okay', {
          duration: 2000,
          panelClass: ['red-snack-bar']
        });
      }
    }))
  }
}
  signInFormInitialization(){
    this.signInForm = new FormGroup({
      email: new FormControl(
        null,
        [
          Validators.email,
          Validators.required
        ]
      ),
      password: new FormControl(
        null,
        [
          Validators.required,
          passwordStrengthValidator(),
        ]
      )
    })
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
