import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() comment: any = {};

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {}

  attachUserName(fName: string, lName: string) {
    this.commentsService.attachUserNameService(`${fName} ${lName}`);
  }
}
