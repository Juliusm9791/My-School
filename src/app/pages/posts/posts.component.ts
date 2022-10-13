import { Component, OnInit } from '@angular/core';

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


  constructor(private postsService: PostsService) {
   
    this.postsService.changePosts.subscribe((posts) => {
      this.posts = posts;
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
  likes( post :Post){
    return this.postsService.countLikes(post)
  }
  
  
} 
