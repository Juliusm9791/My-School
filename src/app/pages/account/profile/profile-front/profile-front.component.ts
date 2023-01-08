import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyService } from 'src/app/pages/faculty/faculty.service';
import { Me } from 'src/app/types/types';

@Component({
  selector: 'app-profile-front',
  templateUrl: './profile-front.component.html',
  styleUrls: ['./profile-front.component.css'],
})
export class ProfileFrontComponent implements OnInit {
  facultyMemberID: any;
  facultyMember: Me = {} as Me;
  defaultAvatar: string = '../../../../assets/images/account.png';

  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyService
  ) {}

  ngOnInit(): void {
    this.facultyMemberID = this.route.snapshot.paramMap.get('id');
    this.facultyMember = this.facultyService.singleFacultyMember(
      this.facultyMemberID
    );
    console.log(this.facultyMember);
  }
}
