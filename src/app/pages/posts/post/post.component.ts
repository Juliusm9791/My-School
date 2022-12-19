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
  @Input() isUserPosts: boolean = false;
  isFullDescription: boolean = false;
  updatePostData: Post = {} as Post;
  postDataLoading: boolean = true;
  defaultAvatar: string = '../../../../assets/images/account.png';

  constructor(private router: Router, private postService: PostsService) {
    
  }

  ngOnInit(): void {}

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
      this.postService.deletePost(id);
    }
  }
  updatePost(id: string) {
    this.router.navigate(['/account/profile/form-post/' + id]);
  }

  postPictures(index: number, locations: any[]) {
    let postPictures: string[] = [];
    locations.forEach(e => postPictures.splice(e.id, 0, e.location));
    if (postPictures[index]) {
      return postPictures[index]
    } else {
      return "../../../../assets/images/default-placeholder-300x300.png"
    }
  }
}
