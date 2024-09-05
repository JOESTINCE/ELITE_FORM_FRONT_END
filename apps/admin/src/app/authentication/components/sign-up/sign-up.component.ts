import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!:any;
  constructor(
    private router: Router
  ) {

  }
  ngOnInit(){
    this.initializeSignUpForm()
  }
  onRegister() {
    if(this.signUpForm?.value?.password !== this.signUpForm?.value?.confirmPassword){

    }
    else if(this.signUpForm.valid){
      this.router.navigate(['/signin']);
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

}
