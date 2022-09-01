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
  ngOnInit(): void {
    this.postsService.queryPosts();
  }
  likes( comment:any){
    return this.postsService.countLikes(comment)
  }
  
  
} 
