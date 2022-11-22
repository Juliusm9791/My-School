import { Component, OnInit } from '@angular/core';
import { Department, Post } from 'src/app/types/types';
import { DepartmentsService } from '../departments/departments.service';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  homeCalendar: boolean = true;
  posts: Post[] = [];
  loading: boolean = true;
  error: any;
  departments: Department[] = [];
  private _isUserPosts: boolean = false;

  constructor(
    private postsService: PostsService,
    private departmentService: DepartmentsService
  ) {
    this.departmentService.changeDepartments.subscribe((department) => {
      for (let i = 0; i < 6; i++) {
        this.departments.push(department[i]);
      }
    });
    this.postsService.changePosts.subscribe((posts) => {
      for (let i = 0; i < 3; i++) {
        this.posts.push(posts[i]);
      }
    });
    this.postsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.postsService.changeError.subscribe((error) => {
      this.error = error;
    });
  }
  get isUserPosts() {
    return this._isUserPosts;
  }

  ngOnInit(): void {
    this.postsService.queryPosts();
    this.departmentService.queryDepartment();
  }
  likes(comment: any) {
    return this.postsService.countLikes(comment);
  }
}
