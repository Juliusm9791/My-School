import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { GraphqlQueryService } from 'src/app/services/graphql/graphql-query.service';
import { SIGNUP } from '../../../services/graphql/mutations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private mutationService: GraphqlQueryService) {}

  error: any;
  signUpData: any;

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
    if (msg === 'email') {
      if (this.signUpForm.controls.email.hasError('required')) {
        return `You must enter an ${msg}`;
      }
    }
    if (msg === 'password') {
      if (this.signUpForm.controls.password.hasError('required')) {
        return `You must enter a ${msg}`;
      }
    }

    return this.signUpForm.controls.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  ngOnInit(): void {}
  onSubmit() {
    this.mutationService.mutation(SIGNUP, {
      firstName: this.signUpForm.controls.firstName.value,
      middleName: this.signUpForm.controls.middleName.value,
      lastName: this.signUpForm.controls.lastName.value,
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    });
  }
}
