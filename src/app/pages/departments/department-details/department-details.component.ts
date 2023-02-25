import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Me, Post } from 'src/app/types/types';
import { PostsService } from '../../posts/posts.service';
import { FacultyService } from '../../faculty/faculty.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
})
export class DepartmentDetailsComponent implements OnInit {
  @Input() facultyMember: Me = {} as Me;
  departmentPosts: Post[] = [];
  departmentId: string | null;
  loading: boolean = true;
  allFacultyMembers: Me[] = [];
  constructor(
    private postsService: PostsService,
    private facultyService: FacultyService,
    private route: ActivatedRoute
  ) {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.postsService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });

    this.facultyService.changeFacultyMembers.subscribe((users) => {
      this.allFacultyMembers = users;
      this.allFacultyMembers = this.allFacultyMembers.filter((member) => member.groupId[0].groupName === 'Faculty');
      // this.allFacultyMembers = this.allFacultyMembers.slice(0, 6);
    });
  }

  ngOnInit(): void {
    this.departmentId &&
      (this.departmentPosts = this.postsService.departmentPosts(
        this.departmentId
      ));
    this.departmentId &&
      (this.allFacultyMembers = this.facultyService.departmentFaculty(
        this.departmentId
      ));
  }
  likes(post: Post) {
    return this.postsService.countLikes(post);
  }
}
