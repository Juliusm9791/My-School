import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  topSearchInput = new FormControl('');
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
    private loginSignupService: LoginSignupService,
    private postsService: PostsService,
    private router: Router
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
  topSearch() {
    if (this.topSearchInput.value) {
      this.postsService.searchInPost(this.topSearchInput.value);
      this.topSearchInput.reset();
      this.router.navigate(['/search']);
    }
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
