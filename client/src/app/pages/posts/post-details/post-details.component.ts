import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Me, Post } from 'src/app/types/types';
import { LoginSignupService } from '../../account/login-signup.service';
import { PostsService } from '../posts.service';
import { PostDetailsService } from './post-details.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post = {} as Post;
  loading: boolean = true;
  isLoggedIn: boolean = false;
  me: Me = {} as Me;

  constructor(
    private postDetailsService: PostDetailsService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
  ) {
    this.postDetailsService.changePost.subscribe((post) => {
      this.post = post;
    });
    this.postDetailsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    const postId: any = this.route.snapshot.paramMap.get('id');
    this.postDetailsService.queryPost(postId);
    this.isLoggedIn = this.authService.isLoggedIn;
    this.me = this.loginSignupService.me;
  }

  likes(post: Post) {
    return this.postsService.countLikes(post);
  }
}
