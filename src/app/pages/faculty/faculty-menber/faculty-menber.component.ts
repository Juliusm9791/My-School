import { Component, Input, OnInit } from '@angular/core';
import { Me } from 'src/app/types/types';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-menber',
  templateUrl: './faculty-menber.component.html',
  styleUrls: ['./faculty-menber.component.css']
})
export class FacultyMenberComponent implements OnInit {
  @Input() facultyMenber: Me = {} as Me;
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
  }

}
