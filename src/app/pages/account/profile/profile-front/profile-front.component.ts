import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { FacultyService } from 'src/app/pages/faculty/faculty.service';
import { UserService } from 'src/app/services/service';
import { LoginSignupService } from '../../login-signup.service';
import { Me } from 'src/app/types/types';

@Component({
  selector: 'app-profile-front',
  templateUrl: './profile-front.component.html',
  styleUrls: ['./profile-front.component.css'],
})
export class ProfileFrontComponent implements OnInit {
  // facultyMemberID: any;
  userId: any;
  // facultyMember: Me = {} as Me;
  user: any;
  loading: boolean = true;
  defaultAvatar: string = '../../../../assets/images/account.png';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private loginSignupService: LoginSignupService,
    private router: Router
  ) {
    this.userService.changeUser.subscribe((user) => {
      this.user = user;
    })
    this.userService.changeUserLoading.subscribe((loading) => {
      this.loading = loading;
    })
  }

  ngOnInit(): void {
    // this.facultyMemberID = this.route.snapshot.paramMap.get('id');
    // this.facultyMember = this.facultyService.singleFacultyMember(
    //   this.facultyMemberID
    // );
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId === this.loginSignupService.me._id) {
      this.router.navigate(['/account/profile']);
      return
    }; 
    this.userService.queryUser(this.userId);
    // console.log(this.facultyMember);
  }

  gatherData(element: any[], elementName: string) {
    let result: string [] = []
    element.forEach((e: any)=> result.push(e[elementName]));
    return result.join(', ');
  }
}
