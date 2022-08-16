import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services//auth/auth.service';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: any;
  me: any;
  loading: boolean = true;

  constructor(private authService: AuthService, private loginSignupService: LoginSignupService) { }

  ngOnInit(): void {
    this.loginSignupService.queryMe();
    this.loginSignupService.changeLoading.subscribe((me) => {
      this.me = me.me;
      this.loading =me.loading;
    });
  }

  logout() {
    this.authService.logout();
  }

}
