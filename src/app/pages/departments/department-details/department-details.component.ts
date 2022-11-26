import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/types/types';
import { PostsService } from '../../posts/posts.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  departmentPosts: Post[] = [];
  departmentId: string | null;
  loading: boolean = true;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.postsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {
    this.departmentId &&
      (this.departmentPosts = this.postsService.departmentPosts(
        this.departmentId
      ));
  }
  likes(post: Post) {
    return this.postsService.countLikes(post);
  }
}
