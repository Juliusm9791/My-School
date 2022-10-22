import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/types/types';
import { PostDetailsService } from '../post-details/post-details.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Input() countLikes: number = 0;
  @Input() isUserPosts: boolean = false
  isFullDescription: boolean = false;
  updatePostData: Post = {} as Post
  postDataLoading: boolean = true

  constructor(private router: Router, private postService: PostsService, private postDetailsService: PostDetailsService) {

    this.postDetailsService.changePost.subscribe((post) => {
      this.updatePostData = post;
      console.log(this.updatePostData)
    });
    this.postDetailsService.changeLoading.subscribe((loading) => {
      this.postDataLoading = loading;
    });
  }

  ngOnInit(): void { }

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
    this.postDetailsService.queryPost(id)
  }
}
