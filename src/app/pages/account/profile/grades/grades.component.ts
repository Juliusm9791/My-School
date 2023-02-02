import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/types/types';
import { PostsService } from 'src/app/pages/posts/posts.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  gradePosts: Post[] = [];
  gradeId: string | null;
  loading: boolean = true;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.gradeId = this.route.snapshot.paramMap.get('id');
    this.postsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {
    this.gradeId &&
      (this.gradePosts = this.postsService.gradePosts(
        this.gradeId

      ));
    console.log("here", this.gradePosts)
  }
  likes(post: Post) {
    return this.postsService.countLikes(post);
  }

}
