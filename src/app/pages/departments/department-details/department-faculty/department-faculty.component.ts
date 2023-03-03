import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/pages/faculty/faculty.service';
import { Me } from 'src/app/types/types';

@Component({
  selector: 'app-department-faculty',
  templateUrl: './department-faculty.component.html',
  styleUrls: ['./department-faculty.component.css'],
})
export class DepartmentFacultyComponent implements OnInit {
  defaultAvatar = '../../../../assets/images/account.png';

  @Input() facultyMember: Me = {} as Me;
  constructor(private facultyService: FacultyService, private router: Router) {}

  ngOnInit(): void {}
  profileFront(id: string) {
    this.router.navigate(['/profile/detail/' + id]);
  }
}
