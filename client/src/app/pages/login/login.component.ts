import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth.service';
import { Me } from "../types/types"


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

const QUERY_ME = gql`
  query user {
    me {
      _id
      firstName
      middleName
      lastName
      email
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = true;
  error: any;
  loginData: any;
  me: Me = {} as Me;

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  isLoggedIn: boolean = false;

  constructor(private apollo: Apollo, private auth: AuthService) {
    this.isLoggedIn = this.auth.isLoggedIn;
  }

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
      this.loginData = data;
      this.auth.login(this.loginData.login.token);
      this.queryMe();
    }, (error) => {
      console.log('login error', error);
    });
  }

  queryMe() {
    this.apollo
      .watchQuery({
        query: QUERY_ME,
      })
      .valueChanges.subscribe((result: any) => {
        this.me = result?.data?.me;
        console.log(this.me);
        this.loading = result.loading;
        this.error = result.error;
      });
  }

}
