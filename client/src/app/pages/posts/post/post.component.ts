import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: any = {} as any;
  @Input() countLikes: number = 0;
  isFullDescription: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeFullDescription() {
    this.isFullDescription = !this.isFullDescription;
  }

  postCut(s: string) {
    const spaceIndex = s.split('').indexOf(' ', 150);
    const cutlength = s.split('').slice(0, spaceIndex).join('');
    return cutlength;
  }
}
