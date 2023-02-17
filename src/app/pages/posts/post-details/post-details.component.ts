import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Me, Post, Reaction } from 'src/app/types/types';
import { LoginSignupService } from '../../account/login-signup.service';
import { PostsService } from '../posts.service';
import { PostDetailsService } from './post-details.service';
import { restrictedWords } from '../../../shared/bad-words-list';
import { CommentsService } from '../post/comments/comments.service';
import { NotificationsService } from 'src/app/services/service';

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
    private notificationsService: NotificationsService,
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
      post.pictures.forEach((picture) =>
        this.postPictures.splice(picture.order, 0, picture.location)
      );
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
  isLiked() {
    return this.postsService.isLiked(this.post, this.me._id);
  }

  onSubmit() {
    let comment: any = this.commentForm.controls.comment.value;
    if (comment !== '' || null) {
      this.postDetailsService.addComment(comment, this.postId);
      if (this.post.userId._id !== this.me._id) {
        this.notificationsService.addNotification(this.post.userId._id, "Comment", this.post._id)
      }
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

  postPictures: string[] = [];

  deparmentDetails(id: string) {
    this.router.navigate(['/departments/' + id]);
  }

  addLike(postId: string) {
    if (this.me._id) {
      this.postsService.addUserLike(this.me._id, postId);
      if (this.post.userId._id !== this.me._id) {
        this.notificationsService.addNotification(this.post.userId._id, "Like", this.post._id)
      }
    }
  }

  profileFront(id: string) {
    this.router.navigate(['/profile/detail/' + id]);
  }
}
