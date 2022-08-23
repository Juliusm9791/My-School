import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginSignupService } from './pages/account/login-signup.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'client';
  mobileQuery: MediaQueryList;
  isLoggedIn: boolean = false;
  me: any;
  loading: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, private loginSignupService: LoginSignupService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
  }
  ngOnInit(): void {
    this.authService.loggedIn();
    this.isLoggedIn = this.authService.isLoggedin;

    if (this.isLoggedIn) {
      this.loginSignupService.queryMe();
      this.me = this.loginSignupService.getMe;
    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
