import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Me } from '../../../types/types';
import { LoginService } from './login.service';

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
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {
    this.isLoggedIn = authService.isLoggedIn;
    this.loading = loginService.loading;
    this.error = loginService.error;
  }

  getErrorMessage(msg: string) {
    if (msg === 'email') {
      if (this.loginForm.controls.email.hasError('required')) {
        return `You must enter an ${msg}`;
      }
    }
    if (msg === 'password') {
      if (this.loginForm.controls.password.hasError('required')) {
        return `You must enter a ${msg}`;
      }
    }

    return this.loginForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  ngOnInit(): void {
    this.authService.changeLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onSubmit() {
    this.loginService.userLogin({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });
  }

  logout() {
    this.authService.logout();
  }
}
