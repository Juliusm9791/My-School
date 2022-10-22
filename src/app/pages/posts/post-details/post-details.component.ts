import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  postId: any;
  post: Post = {} as Post;
  loading: boolean = true;
  isLoggedIn: boolean = false;
  me: Me = {} as Me;
  userPosts: Post[] = [];
  private _isUserPosts: boolean = true;


  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });

  constructor(
    private postDetailsService: PostDetailsService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private loginSignupService: LoginSignupService
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
  get isUserPosts() {
    return this._isUserPosts;
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.postDetailsService.queryPost(this.postId);
    this.isLoggedIn = this.authService.isLoggedIn;
    this.me = this.loginSignupService.me;
  }

  likes(post: Post) {
    return this.postsService.countLikes(post);
  }

  onSubmit() {
    const comment: any = this.commentForm.controls.comment.value;

    console.log(comment, this.postId);
    this.postDetailsService.addComment(comment, this.postId);
    this.commentForm.reset();
  }
}
