import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/types/types';
import { PostDetailsService } from './post-details.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post = {} as Post;
  postId: string = '';
  constructor(private postDetailsService: PostDetailsService) {}

  ngOnInit(): void {
    this.post = this.postDetailsService.post;
    this.postId = this.postDetailsService.post._id
  }
}
