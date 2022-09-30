import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services//auth/auth.service';
import { Me, Post } from 'src/app/types/types';
import { PostsService } from '../../posts/posts.service';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  me: Me = {} as Me;
  error: any;
  loading: boolean = true;
  userPostsLoading: boolean = true;
  userPosts: Post[] = [];

  constructor(
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
    private postsService: PostsService,
    private router: Router
  ) {
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.postsService.changeUserPostsLoading.subscribe((loading) => {
      this.userPostsLoading = loading;
    });
    this.postsService.changeUserPosts.subscribe((userPosts) => {
      console.log(userPosts)
      this.userPosts = userPosts;
    });
  }

  ngOnInit(): void {
    this.postsService.queryUserPosts();
    this.userPosts = this.postsService.userPosts;
    console.log(this.userPosts)
    this.isLoggedIn = this.authService.isLoggedIn;
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
      ;
    }
    this.loading = this.loginSignupService.isLoading;
    this.me = this.loginSignupService.me;
  }

  logout() {
    this.authService.logout();
    this.loginSignupService.deleteMe();
  }
  likes( post :Post){
    return this.postsService.countLikes(post)
  }
}
