import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Me } from 'src/app/types/types';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-member',
  templateUrl: './faculty-member.component.html',
  styleUrls: ['./faculty-member.component.css'],
})
export class FacultyMemberComponent implements OnInit {
  @Input() facultyMember: Me = {} as Me;
  constructor(private facultyService: FacultyService, private router: Router) {}

  ngOnInit(): void {}

  profileFront(id: string) {
    this.router.navigate(['/profile/detail/' + id]);
  }
}
