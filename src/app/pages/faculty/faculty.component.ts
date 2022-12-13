import { Component, OnInit } from '@angular/core';
import { Faculty, Me } from 'src/app/types/types';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];
  facultyMembersLoading: boolean = true;
  facultyMembers: Me[] = []

  constructor(private facultyService: FacultyService) {
    this.facultyService.changeFaculties.subscribe((faculties) => {
      this.faculties = faculties;
    });
    this.facultyService.changeFacultyMembersLoading.subscribe((loading) => {
      this.facultyMembersLoading = loading;
    });
    this.facultyService.changeFacultyMembers.subscribe((users) => {
      this.facultyMembers = users;

    });
  }

  ngOnInit(): void {
    this.facultyService.queryFaculties();
    this.facultyService.queryFacultyMembers();
  }
  allFacultyMembers() {
    return this.facultyService.filterFacultyMembers()
  }
}
