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
<<<<<<< Updated upstream
  postsLoading: boolean = true;
=======
  userPostsLoading: boolean = true;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    this.postsService.changePosts.subscribe((posts:Post[]) => {
      this.userPosts = posts.filter(post => {return post.userId._id === this.me._id});
    });
    this.postsService.changeLoading.subscribe((loading) => {
      this.postsLoading = loading;
=======
    this.postsService.changeUserPostsLoading.subscribe((loading) => {
      this.userPostsLoading = loading;
    });
    this.postsService.changeUserPosts.subscribe((userPosts) => {
      console.log(userPosts)
      this.userPosts = userPosts;
>>>>>>> Stashed changes
    });
  }

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.postsService.queryPosts();
    this.isLoggedIn = this.authService.isLoggedIn;

=======
    this.postsService.queryUserPosts();
    this.userPosts = this.postsService.userPosts;
    console.log(this.userPosts)
    this.isLoggedIn = this.authService.isLoggedIn;
>>>>>>> Stashed changes
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
