import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Me, Post } from 'src/app/types/types';
import { LoginSignupService } from '../../account/login-signup.service';
import { PostsService } from '../posts.service';
import { PostDetailsService } from './post-details.service';
import { restrictedWords } from '../../../shared/bad-words-list';
import { CommentsService } from '../post/comments/comments.service';

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
  defaultAvatar: string = '../../../../assets/images/account.png';

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required, restrictedWords()]),
  });

  constructor(
    private postDetailsService: PostDetailsService,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
    private commentsService: CommentsService,
    private router: Router
  ) {
    this.commentsService.changeUserNameComment.subscribe((user) => {
      this.commentForm.controls.comment.setValue(user);
    });
    this.postDetailsService.changePost.subscribe((post) => {
      this.post = post;
      console.log('post:', post);
    });

    this.postDetailsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    console.log(this.commentForm.controls.comment);
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
    let comment: any = this.commentForm.controls.comment.value;
    if (comment !== '' || null) {
      this.postDetailsService.addComment(comment, this.postId);
      this.commentForm.reset();
    }
  }

  deletePost(id: string) {
    if (confirm('Are you sure to delete this post')) {
      this.postsService.deletePost(id);
      this.router.navigate(['/account/profile/']);
    }
  }
  updatePost(id: string) {
    this.router.navigate(['/account/profile/form-post/' + id]);
  }

  deparmentDetails(id: string) {
    this.router.navigate(['/departments/' + id]);
  }
}
