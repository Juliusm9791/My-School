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
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;


  constructor(private postsService: PostsService) {

    this.postsService.changePosts.subscribe((posts) => {
      this.posts = posts;
      this.length = posts.length
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
    return this.postsService.countLikes(post)
  }
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(this.length)
    console.log(this.pageIndex)
    console.log(this.pageSize)
  }
  postsPage() {
    return this.posts.filter((post, index) => index < this.pageSize)
  }

}
