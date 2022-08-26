import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/types/types';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];

  constructor(private facultyService: FacultyService) {
    this.facultyService.changeFaculties.subscribe((faculties) => {
      this.faculties = faculties;
    });
  }

  ngOnInit(): void {
    this.facultyService.queryFaculties();
  }
}
