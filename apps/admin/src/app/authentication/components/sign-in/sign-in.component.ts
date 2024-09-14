import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';
import { SignInService } from '../../services/sign-in.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../../common-components/services/common-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm!:any;
  subscriptionObj: Subscription = new Subscription();
  isButtonLoader: boolean=false;
constructor(
  private router: Router,
  private signInService : SignInService,
  private snackBar: MatSnackBar,
  private commonService: CommonServiceService
){

}
ngOnInit(){
  this.signInFormInitialization();
}
onLogin(){
  this.isButtonLoader = true;
  if(this.signInForm?.valid){
    this.subscriptionObj.add(this.signInService.signInUser(this.signInForm.value).subscribe({
      next: (res: any)=>{
        if(res?.data?.message==='LOGIN_SUCCESSFUL' && res?.data?.userId){
          let userId = this.commonService.encrypt(res.data.userId);
          localStorage.setItem('userId', userId);
          this.snackBar.open('Login successful', 'okay', {
            duration: 2000,
            panelClass: ['green-snack-bar']
          });
          this.isButtonLoader = false
          this.router.navigate(['/app/dashboard']);
        }
        else{
          this.snackBar.open('Invalid credentials', 'okay', {
            duration: 2000,
            panelClass: ['red-snack-bar']
          });
          this.isButtonLoader = false;
        }
      },
      error: (error: any)=>{
        this.snackBar.open('Error in login', 'okay', {
          duration: 2000,
          panelClass: ['red-snack-bar']
        });
        this.isButtonLoader = false;
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
  ngOnDestroy(){
    this.subscriptionObj.unsubscribe();
  }
}
