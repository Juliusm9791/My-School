import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginSignupService } from './pages/account/login-signup.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'client';
  mobileQuery: MediaQueryList;
  isLoggedIn: boolean = false;
  me: any;
  loading: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private loginSignupService: LoginSignupService
  ) {
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
    this.isLoggedIn = this.authService.isLoggedIn;

    if (this.isLoggedIn) {
      this.loginSignupService.queryMe();
      this.me = this.loginSignupService.me;
    }
  }
  onActivate(event: any) {
    document.querySelector<any>('mat-sidenav-content').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  schoolList: string[] = [
    'Abbotts Hill Elementary School',
    'Alpharetta Elementary School',
    'Alpharetta High School',
    'Asa G. Hilliard Elementary School',
    'Autrey Mill Middle School',
    'Banneker High School',
    'Barnwell Elementary School',
    'Bear Creek Middle School',
    'Birmingham Falls Elementary School',
    'Brookview Elementary School',
    'Cambridge High School',
    'Camp Creek Middle School',
    'Campbell Elementary School',
    'Centennial High School',
    'Chattahoochee High School',
    'Cliftondale Elementary School',
    'Cogburn Woods Elementary School',
    'College Park Elementary School',
    'Conley Hills Elementary School',
    'Crabapple Crossing Elementary School',
    'Crabapple Middle School',
    'Creek View Elementary School',
    'Creekside High School',
  ];
}
