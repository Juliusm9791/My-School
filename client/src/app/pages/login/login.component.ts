import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
// import Auth from "./auth";


const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apollo: Apollo) { }
  me: any[] = [];
  loading = true;
  error: any;

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  getErrorMessage(msg: string) {
    if (msg === "email") {
      if (this.loginForm.controls.email.hasError('required')) {
        return `You must enter an ${msg}`;
      }
    }
    if (msg === "password") {
      if (this.loginForm.controls.password.hasError('required')) {
        return `You must enter a ${msg}`;
      }
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void { }

  onSubmit() {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('login error', error);
    });
  }
}
