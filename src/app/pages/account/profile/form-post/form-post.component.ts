import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentsService } from 'src/app/pages/departments/departments.service';
import { PostsService } from 'src/app/pages/posts/posts.service';
import { Department, Post } from 'src/app/types/types';
import { FormPostService } from './form-post.service';

const badWords: string[] = ['foo', 'boo'];

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css'],
})
export class FormPostComponent implements OnInit {
  departmentList: Department[] = [];

  postForm = new FormGroup({
    postTitle: new FormControl('', [
      Validators.required,
      this.restrictedWords(badWords),
    ]),
    postDescription: new FormControl('', [
      Validators.required,
      this.restrictedWords(badWords),
    ]),
    isEvent: new FormControl(false),
    eventDate: new FormControl(''),
    departmentId: new FormControl(''),
  });

  post: Post = {} as Post;
  postId: any = this.route.snapshot.paramMap.get('id');
  minDate: any = formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postFormService: FormPostService,
    private departmentsService: DepartmentsService,
    private postsService: PostsService
  ) {
    this.postForm.controls.eventDate.setValue(
      formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    );
    this.postForm.controls.eventDate.setValue(
      formatDate(new Date(), 'yyyy-MM-ddTHH:mm', 'en')
    );
    if (this.postId) {
      this.post = this.postsService.singlePost(this.postId);

      this.postForm.controls.postTitle.setValue(this.post.title);
      this.postForm.controls.postDescription.setValue(this.post.description);
      this.postForm.controls.isEvent.setValue(this.post.isEvent);
      this.postForm.controls.departmentId.setValue(this.post.departmentId._id);
      this.postForm.controls.eventDate.setValue(
        formatDate(this.post.eventDate, 'yyyy-MM-ddTHH:mm', 'en')
      );
    }
  }

  ngOnInit() {
    if (this.departmentsService.departments.length === 0)
      this.departmentsService.queryDepartment();
    this.departmentList = this.departmentsService.departments;
  }

  onSubmit() {
    if (!this.postId) {
      if (this.postForm.valid) {
        const title: any = this.postForm.controls.postTitle.value;
        const description: any = this.postForm.controls.postDescription.value;
        const isPostEvent: any = this.postForm.controls.isEvent.value;
        const selectedDepartmentId: any =
          this.postForm.controls.departmentId.value;
        const eventDate: any = this.postForm.controls.eventDate.value;
        this.postFormService.addPost(
          title,
          description,
          isPostEvent,
          selectedDepartmentId,
          eventDate
        );
      }
    } else {
      console.log(this.postForm);
    }
  }
  restrictedWords(words: string[]) {
    return (control: FormControl): { [key: string]: any } | null => {
      if (!words) return null;

      let invalidWords = words
        .map((w) => (control.value.includes(w) ? w : null))
        .filter((w) => w != null);

      return invalidWords && invalidWords.length > 0
        ? { restrictedWords: invalidWords.join(', ') }
        : null;
    };
  }
  handleCancel() {
    this.router.navigate(['/account/profile/']);
  }
}
