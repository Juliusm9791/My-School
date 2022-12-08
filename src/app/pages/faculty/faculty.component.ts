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
  facultyMenbersLoading: boolean = true;
  facultyMenbers: Me[] = []

  constructor(private facultyService: FacultyService) {
    this.facultyService.changeFaculties.subscribe((faculties) => {
      this.faculties = faculties;
    });
    this.facultyService.changeFacultyMenbersLoading.subscribe((loading) => {
      this.facultyMenbersLoading = loading;
    });
    this.facultyService.changeFacultyMenbers.subscribe((users) => {
      this.facultyMenbers = users;

    });
  }

  ngOnInit(): void {
    this.facultyService.queryFaculties();
    this.facultyService.queryFacultyMenbers();
  }
  allFacultyMenbers() {
    //return this.facultyService.filterFacultyMembers()
  }
}
