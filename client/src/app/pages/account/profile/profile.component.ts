import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services//auth/auth.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: any;
  me: any;
  loading: boolean = true;

  constructor(private authService: AuthService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.queryMe();
    this.loginService.changeLoading.subscribe((me) => {
      this.me = me.me;
      this.loading =me.loading;
    });
  }

  logout() {
    this.authService.logout();
  }

}
