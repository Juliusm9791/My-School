import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/types/types';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = true;
  error: any;

  constructor(private postsService: PostsService) {
    this.postsService.changePosts.subscribe((posts) => {
      for (let i = 0; i < 5; i++) {
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
  ngOnInit(): void {
    this.postsService.queryPosts();
  }
  likes(comment: any) {
    return this.postsService.countLikes(comment);
  }
}
