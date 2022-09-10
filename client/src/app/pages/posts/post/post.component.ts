import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/types/types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {} as Post;
  @Input() countLikes: number = 0;
  isFullDescription: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeFullDescription() {
    this.isFullDescription = !this.isFullDescription;
  }

  postCut(s: string) {
    const spaceIndex = s.split('').indexOf(' ', 150);
    return s.split('').slice(0, spaceIndex).join('');
  }
}
