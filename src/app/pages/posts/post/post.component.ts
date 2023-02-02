import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Me, Post, Reaction } from 'src/app/types/types';
import { LoginSignupService } from '../../account/login-signup.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Input() countLikes: number = 0;
  @Input() isUserPosts: boolean = false;
  me: Me = {} as Me;
  isFullDescription: boolean = false;
  updatePostData: Post = {} as Post;
  postDataLoading: boolean = true;
  defaultAvatar: string = '../../../../assets/images/account.png';

  constructor(
    private router: Router,
    private postsService: PostsService,
    private loginSignupService: LoginSignupService
  ) {
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
  }

  ngOnInit(): void {
    this.me = this.loginSignupService.me;
  }

  changeFullDescription() {
    this.isFullDescription = !this.isFullDescription;
  }

  postDetail(postId: string) {
    this.router.navigate(['/posts/' + postId]);
  }

  postCut(s: string) {
    const spaceIndex = s.split('').indexOf(' ', 300);
    return s.split('').slice(0, spaceIndex).join('');
  }

  deletePost(id: string) {
    if (confirm('Are you sure to delete this post')) {
      this.postsService.deletePost(id);
    }
  }
  updatePost(id: string) {
    this.router.navigate(['/account/profile/form-post/' + id]);
  }

  postPictures(index: number, locations: any[]) {
    let postPictures: string[] = [];
    locations.forEach((e) => postPictures.splice(e.order, 0, e.location));
    if (postPictures[index]) {
      return postPictures[index];
    } else {
      return '../../../../assets/images/default-placeholder-300x300.png';
    }
  }
  gradeDetails(id: string) {
    this.router.navigate(['/profile/grades/' + id]);
  }
  deparmentDetails(id: string) {
    this.router.navigate(['/departments/' + id]);
  }

  addLike(postId: string) {
    if (this.me._id) {
      this.postsService.addUserLike(this.me._id, postId);
    }
  }
  isLiked() {
    return this.postsService.isLiked(this.post, this.me._id);
  }

  profileFront(id: string) {
    this.router.navigate(['/profile/detail/' + id]);
  }
}
