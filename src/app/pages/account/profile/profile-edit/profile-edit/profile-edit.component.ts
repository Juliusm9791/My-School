import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProfileService } from './profile-edit.service';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { Department, Me } from 'src/app/types/types';
import { LoginSignupService } from '../../../login-signup.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  // constructor() { }

  // ngOnInit(): void {
  // }
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    // gradeId: new FormControl(''),
    departmentId: new FormControl(''),
    groupId: new FormControl(''),
    gradeId: new FormControl(''),
    aboutMe: new FormControl(''),
  });

  me: Me = {} as Me;
  departmentList: Department[] = [];
  // gradeList: Grade[] = [];
  isLoadingDepartments: boolean = true;
  isLoadingGrades: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileFormService: FormProfileService,
    private departmentsService: DepartmentsService,
    // private gradesService: GradesService,
    private loginSignupService: LoginSignupService
  ) {
    this.departmentsService.changeDepartmentsLoading.subscribe((loading) => {
      this.isLoadingDepartments = loading;
    });
    this.departmentsService.changeDepartments.subscribe((dep: Department[]) => {
      this.departmentList = dep;
    });
    // this.gradesService.changeGradesLoading.subscribe((loading) => {
    //   this.isLoadingGrades = loading;
    // });
    // this.gradesService.changeGrades.subscribe((dep: Department[]) => {
    //   this.departmentList = dep;
    // });

    this.me = this.loginSignupService.me;

    this.profileForm.controls.firstName.setValue(this.me.firstName);
    this.profileForm.controls.lastName.setValue(this.me.lastName);
    // this.profileForm.controls.emailAddress.setValue(this.me.email);
    // this.profileForm.controls.address.setValue(this.me.address);
    // this.profileForm.controls.phoneNumber.setValue(this.me.phoneNumber);
    // this.profileForm.controls.departmentId.setValue(
    //   this.me.departmentId[0]._id
    // );
    // this.profileForm.controls.gradeId.setValue(this.post.eventLocation);
    // this.profileForm.controls.aboutMe.setValue(this.me.aboutMe);
  }

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;
  }

  onSubmit() {
    let firstName: any = this.profileForm.controls.firstName.value;
    let lastName: any = this.profileForm.controls.lastName.value;
    // let emailAddress: any = this.profileForm.controls.postDescription.value;
    // let address: any = this.profileForm.controls.isEvent.value;
    // let phoneNumber: any = this.profileForm.controls.departmentId.value;
    // let departmentId: any = this.profileForm.controls.eventDate.value;
    // let eventEndDate: any = this.profileForm.controls.eventEndDate.value;
    // let eventLocation: any = this.profileForm.controls.eventLocation.value;

    this.profileFormService.updateProfile(firstName, lastName);
  }

  // handleCancel() {
  //   this.router.navigate(['/account/profile/']);
  // }
}
