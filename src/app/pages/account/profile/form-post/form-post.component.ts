import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormPostService } from './form-post.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css']
})
export class FormPostComponent implements OnInit {
  postForm = new FormGroup({
    postTitle: new FormControl('', [Validators.required]),
    postDescription: new FormControl('', [Validators.required]),
  });
  constructor( private postFormService:FormPostService ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    const title: any= this.postForm.controls.postTitle.value
    const description: any=this.postForm.controls.postDescription.value
   console.log(title)
   console.log(description)
this.postFormService.addPost(title, description)
    // this.loginSignupService.userLoginSignup(SIGNUP, {
    //   firstName: this.signUpForm.controls.firstName.value,
    //   middleName: this.signUpForm.controls.middleName.value,
    //   lastName: this.signUpForm.controls.lastName.value,
    //   email: this.signUpForm.controls.email.value,
    //   password: this.signUpForm.controls.password.value,
    // });
  }
}



// import {Component} from '@angular/core';

// /** @title Basic datepicker */
// @Component({
//   selector: 'datepicker-overview-example',
//   templateUrl: 'datepicker-overview-example.html',
// })
// export class DatepickerOverviewExample {}