import { Component, Input, OnInit } from '@angular/core';
import { Me } from 'src/app/types/types';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-member',
  templateUrl: './faculty-member.component.html',
  styleUrls: ['./faculty-member.component.css']
})
export class FacultyMemberComponent implements OnInit {
  @Input() facultyMember: Me = {} as Me;
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
  }

}
