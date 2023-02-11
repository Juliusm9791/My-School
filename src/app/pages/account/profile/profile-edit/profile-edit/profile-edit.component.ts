import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProfileService } from './profile-edit.service';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { GradesService, FacultiesService } from 'src/app/services/service';
import { Department, Me, Grade, Faculty } from 'src/app/types/types';
import { LoginSignupService } from '../../../login-signup.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    departmentId: new FormControl(''),
    groupId: new FormControl(''),
    gradeId: new FormControl(''),
    aboutMe: new FormControl(''),
  });

  me: Me = {} as Me;
  departmentList: Department[] = [];
  gradeList: Grade[] = [];
  facultyList: Faculty[] = [];
  isLoadingDepartments: boolean = true;
  isLoadingGrades: boolean = true;
  isLoadingFaculties: boolean = true;
  defaultAvatar: string = '../../../../assets/images/account_plus.svg';

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private profileFormService: FormProfileService,
    private departmentsService: DepartmentsService,
    private gradesService: GradesService,
    private facultiesService: FacultiesService,
    private loginSignupService: LoginSignupService
  ) {
    this.departmentsService.changeDepartmentsLoading.subscribe((loading) => {
      this.isLoadingDepartments = loading;
    });
    this.departmentsService.changeDepartments.subscribe((dep: Department[]) => {
      this.departmentList = dep;
    });
    this.gradesService.changeGradesLoading.subscribe((loading) => {
      this.isLoadingGrades = loading;
    });
    this.gradesService.changeGrades.subscribe((grade: Grade[]) => {
      this.gradeList = grade;
    });
    this.facultiesService.changeFacultiesLoading.subscribe((loading) => {
      this.isLoadingFaculties = loading;
    });
    this.facultiesService.changeFaculties.subscribe((faculty: Faculty[]) => {
      this.facultyList = faculty;
    });

    this.me = this.loginSignupService.me;

    this.profileForm.controls.firstName.setValue(this.me.firstName);
    this.profileForm.controls.lastName.setValue(this.me.lastName);
    this.profileForm.controls.emailAddress.setValue(this.me.email);
    this.profileForm.controls.address.setValue(this.me.address);
    this.profileForm.controls.phoneNumber.setValue(this.me.phoneNumber);

    let department: any = [];
    this.me.departmentId.forEach((id) => department.push(id._id));
    this.profileForm.controls.departmentId.setValue(department);

    let group: any = [];
    this.me.groupId.forEach((id) => group.push(id._id));
    this.profileForm.controls.groupId.setValue(group);

    let grade: any = [];
    this.me.gradeId.forEach((id) => grade.push(id._id));
    this.profileForm.controls.gradeId.setValue(grade);
    this.profileForm.controls.aboutMe.setValue(this.me.aboutMe);

    if (this.me.avatar) {
      this.avatarPreview = this.me.avatar;
    } else {
      this.avatarPreview = this.defaultAvatar;
    }
  }

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;

    if (this.gradesService.grades.length === 0) {
      this.gradesService.queryGrade();
    }
    this.gradeList = this.gradesService.grades;

    if (this.facultiesService.faculties.length === 0) {
      this.facultiesService.queryFaculty();
    }
    this.facultyList = this.facultiesService.faculties;
  }

  onSubmit() {
    let firstName: any = this.profileForm.controls.firstName.value;
    let lastName: any = this.profileForm.controls.lastName.value;
    let email: any = this.profileForm.controls.emailAddress.value;
    let address: any = this.profileForm.controls.address.value;
    let phoneNumber: any = this.profileForm.controls.phoneNumber.value;
    let departmentId: any = this.profileForm.controls.departmentId.value;
    let groupId: any = this.profileForm.controls.groupId.value;
    let gradeId: any = this.profileForm.controls.gradeId.value;
    let aboutMe: any = this.profileForm.controls.aboutMe.value;

    console.log(groupId);
    this.profileFormService.updateProfile(
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      aboutMe,
      departmentId,
      groupId,
      gradeId
    );
    const file = this.selectedFiles.item(0);
    this.profileFormService.uploadFile(file, this.me._id);
  }

  selectedFiles: FileList = {} as FileList;

  // upload() {
  //   const file = this.selectedFiles.item(0);
  //   this.profileFormService.uploadFile(file, this.me._id);
  // }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles[0]);
    reader.onload = (_event) => {
      this.avatarPreview = reader.result;
    };
  }

  avatarPreview: any;
}
