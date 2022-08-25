import { Component, OnInit } from '@angular/core';
import { FacultyService } from './faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
faculties:any
  constructor(private facultyService: FacultyService) { 
    this.facultyService.changeFaculties.subscribe((faculties)=>{
    this.faculties= faculties
    })
  this.faculties =this.facultyService.faculties
  }

  ngOnInit(): void {
    this.facultyService.queryFaculties()
  }

}
