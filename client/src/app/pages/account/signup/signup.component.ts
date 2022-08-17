import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SIGNUP } from 'src/app/services/graphql/mutations';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private loginSignupService: LoginSignupService) { }

  error: any;
  signUpData: any;
  errorMessages: any = {
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    email: "Email",
    password: "Password",
    passwordConfirm: "Confirm Password"
  };

  hide = true;
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  getErrorMessage(msg: string) {
    if (this.errorMessages.hasOwnProperty(msg)) {
      if (this.signUpForm.controls.email.hasError('email')) {
        return 'Not a valid email'
      }
      return (`${this.errorMessages[msg]} is required field`)
    }
    return null;
  }

  ngOnInit(): void { }
  onSubmit() {
    this.loginSignupService.userLoginSignup(SIGNUP, {
      firstName: this.signUpForm.controls.firstName.value,
      middleName: this.signUpForm.controls.middleName.value,
      lastName: this.signUpForm.controls.lastName.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    });
  }
}
