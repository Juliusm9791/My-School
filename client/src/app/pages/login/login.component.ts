import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import decode from "jwt-decode";


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

  constructor(private apollo: Apollo) { }
  // me: any[] = [];
  loading = true;
  error: any;
  loginData: any;
  token: any = null;
  me: any;

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

  login(idToken: any): void {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    // window.location.assign("/posts");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }

  getProfile() {
    this.getToken();
    if (this.token) {
      return decode(this.token);
    }
  }

  loggedIn(): any {
    // Checks if there is a saved token and it's still valid
    this.getToken();
    if (this.token) {
      return !!this.token && !this.isTokenExpired(this.token);
    }
  }

  isTokenExpired(token: any) {
    try {
      const decoded: any = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    this.token = localStorage.getItem("id_token");
  }



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
      this.login(this.loginData.login.token);
      this.queryMe()
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
