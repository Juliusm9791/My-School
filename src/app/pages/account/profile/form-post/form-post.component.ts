import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { Department } from 'src/app/types/types';
import { FormPostService } from './form-post.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css'],
})
export class FormPostComponent implements OnInit {
  departmentList: Department[] = [];
  postForm = new FormGroup({
    postTitle: new FormControl('', [Validators.required]),
    postDescription: new FormControl('', [Validators.required]),
    isEvent: new FormControl(false),
    eventDate: new FormControl(null),
    departmentId: new FormControl(null),
  });


  constructor(
    private postFormService: FormPostService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;
  }

  onSubmit() {
    const title: any = this.postForm.controls.postTitle.value;
    const description: any = this.postForm.controls.postDescription.value;
    const isPostEvent: any = this.postForm.controls.isEvent.value;
    const selectedDepartmentId: any = this.postForm.controls.departmentId.value;
    const eventDate: any = this.postForm.controls.eventDate.value;
    this.postFormService.addPost(
      title,
      description,
      isPostEvent,
      selectedDepartmentId,
      eventDate
    );

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
