import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() comment: any = {};

  constructor(private commentsService: CommentsService, private router: Router) {}

  ngOnInit(): void {}

  attachUserName(fName: string, lName: string) {
    this.commentsService.attachUserNameService(`${fName} ${lName}`);
  }

  profileFront(id: string) {
    this.router.navigate(['/profile/detail/' + id]);
  }
}
