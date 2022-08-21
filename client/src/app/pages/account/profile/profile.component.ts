import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services//auth/auth.service';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  me: any;
  loading: boolean = true;

  constructor(private authService: AuthService, private loginSignupService: LoginSignupService) {

  }

  ngOnInit(): void {
    this.authService.loggedIn();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  logout() {
    this.authService.logout();
    this.authService.loggedIn();
  }

}
