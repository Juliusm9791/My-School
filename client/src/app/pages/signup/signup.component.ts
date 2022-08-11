import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const SIGNUP = gql`
mutation addUser(
  $firstName: String!
  $middleName:String
  $lastName: String!
  $email: String!
  $password: String!
) {
  addUser(
    firstName: $firstName
    middleName: $middleName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    user {
      _id
      firstName
      lastName
      email
    }
    token
  }
}
`;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private apollo: Apollo)  { }
  
  // loading = true;
   error: any;
    signUpData: any;
  // token: any = null;
  // me: any;

  hide = true;
  signUpForm = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    
  });

  getErrorMessage(msg: string) {
    if (msg === "email") {
      if (this.signUpForm.controls.email.hasError('required')) {
        return `You must enter an ${msg}`;
      }
    }
    if (msg === "password") {
      if (this.signUpForm.controls.password.hasError('required')) {
        return `You must enter a ${msg}`;
      }
    }

    return this.signUpForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
  }
onSubmit(){
  this.apollo.mutate({
    mutation: SIGNUP,
    variables: {
      firstName: this.signUpForm.controls.firstName.value,
      middleName: this.signUpForm.controls.middleName.value,
      lastName: this.signUpForm.controls.lastName.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value
    }
  }).subscribe(({ data }) => {
    console.log('got data', data);
    this.signUpData = data;
    // this.login(this.loginData.login.token);
   
  }, (error) => {
    console.log('login error', error);
  });

}
}
