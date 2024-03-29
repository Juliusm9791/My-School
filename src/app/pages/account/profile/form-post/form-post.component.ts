import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { GradesService } from 'src/app/services/service';
import { PostsService } from 'src/app/pages/posts/posts.service';
import { Department, Post, Grade } from 'src/app/types/types';
import { FormPostService } from './form-post.service';

import { restrictedWords } from '../../../../shared/bad-words-list';
import { integer } from 'aws-sdk/clients/cloudfront';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css'],
})
export class FormPostComponent implements OnInit {
  postForm = new FormGroup({
    postTitle: new FormControl('', [Validators.required, restrictedWords()]),
    postDescription: new FormControl('', [
      Validators.required,
      restrictedWords(),
    ]),
    isEvent: new FormControl(false),
    isVisible: new FormControl(false),
    departmentId: new FormControl(''),
    gradeId: new FormControl(''),
    photos: new FormControl(''),
  });

  eventForm = new FormGroup({

    eventDate: new FormControl('', [
      Validators.required,
    ]),
    eventEndDate: new FormControl('', [
      Validators.required,
    ]),
    eventLocation: new FormControl('', [
      Validators.required,
      restrictedWords(),
    ]),

  })

  departmentList: Department[] = [];
  isLoadingDepartments: boolean = true;
  gradeList: Grade[] = [];
  isLoadingGrades: boolean = true;
  post: Post = {} as Post;
  postId: any = this.route.snapshot.paramMap.get('id');
  minDate: any = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postFormService: FormPostService,
    private departmentsService: DepartmentsService,
    private gradesService: GradesService,
    private postsService: PostsService
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

    // this.eventForm.controls.eventDate.setValue(
    //   formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    // );
    // this.eventForm.controls.eventEndDate.setValue(
    //   formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    // );
    if (this.postId) {
      this.post = this.postsService.singlePost(this.postId);

      this.postForm.controls.postTitle.setValue(this.post.title);
      this.postForm.controls.postDescription.setValue(this.post.description);
      this.postForm.controls.isEvent.setValue(this.post.isEvent);
      this.postForm.controls.isVisible.setValue(!this.post.isVisible);
      this.postForm.controls.departmentId.setValue(this.post.departmentId._id);
      let grade: any = [];
      this.post.gradeId.forEach((id) => grade.push(id._id));
      this.postForm.controls.gradeId.setValue(grade);
      this.eventForm.controls.eventLocation.setValue(this.post.eventLocation);
      this.eventForm.controls.eventDate.setValue(
        formatDate(this.post.eventDate, 'yyyy-MM-ddTHH:mm', 'en')
      );
      this.eventForm.controls.eventEndDate.setValue(
        formatDate(this.post.eventEndDate, 'yyyy-MM-ddTHH:mm', 'en')
      );

      if(this.post.pictures) {
        this.post.pictures.forEach(e => this.imgsPreview.splice(e.order, 1, e.location));
      };
    }
  }

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;

    if (this.gradesService.grades.length === 0) this.gradesService.queryGrade();
    this.gradeList = this.gradesService.grades;
  }

  onSubmit() {
    let isPostVisible: any = !this.postForm.controls.isVisible.value;
    let title: any = this.postForm.controls.postTitle.value;
    let description: any = this.postForm.controls.postDescription.value;
    let isPostEvent: any = this.postForm.controls.isEvent.value;
    let selectedDepartmentId: any = this.postForm.controls.departmentId.value;
    let selectedGradeId: any = this.postForm.controls.gradeId.value;
    let eventDate: any = this.eventForm.controls.eventDate.value;
    let eventEndDate: any = this.eventForm.controls.eventEndDate.value;
    let eventLocation: any = this.eventForm.controls.eventLocation.value;
    let photos = this.selectedFiles
    if (!this.postId) {
      if (this.postForm.valid && !isPostEvent || this.postForm.valid && this.eventForm.valid && isPostEvent) {
        this.postFormService.addPost(
          isPostVisible,
          title,
          description,
          isPostEvent,
          selectedDepartmentId,
          selectedGradeId,
          eventDate,
          eventEndDate,
          eventLocation,
          photos
        );
      }
    } else {
      if (this.postForm.valid && !isPostEvent || this.postForm.valid && this.eventForm.valid && isPostEvent) {
        !this.postForm.controls.isEvent.value && (eventDate = null);
        this.postFormService.updatePost(
          this.postId,
          isPostVisible,
          title,
          description,
          isPostEvent,
          selectedDepartmentId,
          selectedGradeId,
          eventDate,
          eventEndDate,
          eventLocation,
        );
        if (photos.length !== 0 || this.deletePicturesId.length !== 0) {
          this.postFormService.uploadPhotos(photos, this.postId, this.post.pictures, this.deletePicturesId);
        };
      }
    }
  }

  selectedFiles: any = [];
  imgsPreview: any = [null, null, null, null, null];
  selectFile(event: any, id: number) {
    const file = event.target.files[0];
    this.deletePicturesId = this.deletePicturesId.filter(e => e !== id);
    if (this.selectedFiles[id]) {
      this.selectedFiles.splice(id, 1, { id: id, file: file });
    } else {
      this.selectedFiles.push({ id: id, file: file });
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgsPreview.splice(id, 1, reader.result);
    };
  };

  deletePicturesId: number[] = [];
  deletePhotoHandler(image: any, id: number) {
    if (image.startsWith("http")) {
      this.deletePicturesId.push(id);
    } else {
      this.selectedFiles = this.selectedFiles.filter((file: any) => file.id !== id);
    }
    this.imgsPreview.splice(id, 1, null);
  }
  // selectFiles(event: any) {
  //   this.selectedFiles = event.target.files;
  //   this.count = event.target.files.length;
  //   if (this.count > 5) {
  //     event.target.value = '';
  //     return;
  //   };

  //   const files = event.target.files;
  //   this.imgsPreview = [];
  //   for (let i = 0; i < this.count; i++ ) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[i]);
  //     reader.onload = (_event) => {
  //         this.imgsPreview.push(reader.result);
  //     }
  //   }
  // }

  handleCancel() {
    this.router.navigate(['/account/profile/']);
  }
}
