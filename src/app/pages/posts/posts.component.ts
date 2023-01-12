import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/types/types';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  departmentsService: any;
  loading: boolean = true;
  error: any;
  private _isUserPosts: boolean = false;

  length = 200;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private postsService: PostsService) {
    this.postsService.changePosts.subscribe((posts) => {
      this.posts = posts;
      this.length = posts.length;
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
  }
  likes(post: Post) {
    return this.postsService.countLikes(post);
  }
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  postsPage() {
    let newArray = this.posts.slice(
      this.pageIndex * this.pageSize,
      this.pageSize + this.pageIndex * this.pageSize
    );
    return newArray;
  }
}
