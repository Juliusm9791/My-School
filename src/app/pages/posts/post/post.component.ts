import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/types/types';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Input() countLikes: number = 0;
  isFullDescription: boolean = false;
  isLoggedInUsersPosts: boolean = true;

  constructor(private router: Router, private postService: PostsService) {}

  ngOnInit(): void {}

  changeFullDescription() {
    this.isFullDescription = !this.isFullDescription;
  }

  postDetail(postId: string) {
    this.router.navigate(['/posts/' + postId]);
  }

  postCut(s: string) {
    const spaceIndex = s.split('').indexOf(' ', 150);
    return s.split('').slice(0, spaceIndex).join('');
  }

  deletePost(id: string) {
    if (confirm('Are you sure to delete this post')) {
      this.postService.deletePost(id);
    }
  }
  updatePost(id: string) {
    console.log(id);
  }
}
