import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from '../../services/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!:any;
  subscriptionObj: Subscription = new Subscription();
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private signUpService: SignupService
  ) {

  }
  ngOnInit(){
    this.initializeSignUpForm()
  }
  onRegister() {
    if(this.signUpForm?.value?.password !== this.signUpForm?.value?.confirmPassword){
      this.snackBar.open('Password mismatches with confirm password', 'okay', {
        duration: 2000,
        panelClass: ['red-snack-bar']
      })
    }
    else if(this.signUpForm.valid){
      if(this.signUpForm?.value?.email && this.signUpForm?.value?.password){
        this.subscriptionObj.add(this.signUpService.createUser(
          {
            email: this.signUpForm.value.email, 
            password: this.signUpForm.value.password
          }).subscribe(
            {
              next: (res)=>{
            if(res){
              this.snackBar.open('Registration successful', 'okay', {
                duration: 2000,
                panelClass: ['green-snack-bar']
              });
              this.router.navigate(['/signin']);
            }
          },
          error: (err)=>{
            if(err){
              if (err?.error === 'USER_ALREADY_EXIST'){
                this.snackBar.open('Email ID already exist!', 'okay', {
                  duration: 2000,
                  panelClass: ['red-snack-bar']
                })
              }
              else{
                this.snackBar.open('Falied to create user', 'okay', {
                  duration: 2000,
                  panelClass: ['red-snack-bar']
                })
              }
            }
          }}))
      }
    }
  }
  initializeSignUpForm(){
    this.signUpForm = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.email
        ]
      ),
      password: new FormControl(null,
        [
          Validators.required,
          passwordStrengthValidator()
        ]
      ),
      confirmPassword: new FormControl(null,
        [
          Validators.required,
          passwordStrengthValidator()
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
