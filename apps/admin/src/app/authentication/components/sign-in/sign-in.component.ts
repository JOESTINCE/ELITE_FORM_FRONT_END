import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm!:any;
constructor(
  private router: Router
){

}
ngOnInit(){
  this.signInFormInitialization();
}
onLogin(){
  if(this.signInForm?.valid){
    this.router.navigate(['/app/dashboard']);
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
