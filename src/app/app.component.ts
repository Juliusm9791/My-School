import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from './pages/account/login-signup.service';
import { PostsService } from './pages/posts/posts.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  topSearchInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  title = 'client';
  mobileQuery: MediaQueryList;
  me: any;
  loading: boolean = true;
  defaultAvatar: string = '../assets/images/account.png';

  private _mobileQueryListener: () => void;
  isLoggedIn: boolean = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
    private postsService: PostsService,
    private router: Router,
    private fireAuth: Auth
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    !this.authService.isLoggedIn.subscribe((logedIn) => {
      logedIn ? this.router.navigate(['/']) : this.loginSignupService.queryMe();
      this.isLoggedIn = logedIn;
    });

    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
  }
  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged((user) => {
      if (!!user) {
        console.log('still session', this.isLoggedIn, user, !!user);
        this.loginSignupService.queryMe();
      } else {
        console.log('session end');

        this.authService.logout();
        // user's session has ended, do something here
      }
    });
  }

  onActivate(event: any) {
    document.querySelector<any>('mat-sidenav-content').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  topSearch() {
    if (this.topSearchInput.value && this.topSearchInput.valid) {
      this.postsService.searchInPost(this.topSearchInput.value);
      this.topSearchInput.reset();
      this.router.navigate(['/search']);
    }
  }
  isUserLoggedIn() {
    !this.isLoggedIn
      ? this.router.navigate(['/account/login'])
      : this.router.navigate(['/account/profile']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  schoolList: string[] = [
    'Abbotts Hill Elem',
    'Alpharetta Elem',
    'Alpharetta High',
    'Asa G Hilliard Elem',
    'Autrey Mill Middle',
    'Banneker High',
    'Barnwell Elem',
    'Bear Creek Middle',
    'Birmingham Falls Elem',
    'Brookview Elem',
    'Cambridge High',
    'Camp Creek Middle',
    'Campbell Elem',
    'Centennial High',
    'Chattahoochee High',
    'Cliftondale Elem',
    'Cogburn Woods Elem',
    'College Park Elem',
    'Conley Hills Elem',
    'Crabapple Crossing Elem',
    'Crabapple Middle',
    'Creek View Elem',
    'Creekside High',
  ];
}
