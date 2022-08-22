import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN } from 'src/app/services/graphql/mutations';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = true;
  error: any;
  loginData: any;
  me: any;

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  inputErrorMessages: any = {
    email: "Email",
    password: "Password",
  };

  constructor(private loginSignupService: LoginSignupService, private router: Router) { }

  getErrorMessage(msg: string) {
    if (this.inputErrorMessages.hasOwnProperty(msg)) {
      if (this.loginForm.controls.email.hasError('email')) {
        return 'Not a valid email'
      }
      return (`${this.inputErrorMessages[msg]} is required field`)
    }
    return null;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginSignupService.userLoginSignup(LOGIN, {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });

    this.router.navigate(['/account/profile'])

  }

}
