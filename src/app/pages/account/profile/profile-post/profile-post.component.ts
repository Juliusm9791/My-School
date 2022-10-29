import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/pages/posts/posts.service';
import { Post } from 'src/app/types/types';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css'],
})
export class ProfilePostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Input() countLikes: number = 0;
  @Input() isUserPosts: boolean = false;
  constructor(private router: Router, private postService: PostsService) {}

  ngOnInit(): void {}

  deletePost(id: string) {
    if (confirm('Are you sure to delete this post')) {
      this.postService.deletePost(id);
    }
  }
  updatePost(id: string) {
    this.router.navigate(['/account/profile/form-post/' + id]);
  }
  postDetail(postId: string) {
    this.router.navigate(['/posts/' + postId]);
  }
}
