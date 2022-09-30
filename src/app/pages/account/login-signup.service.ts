import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QUERY_ME } from 'src/app/services/graphql/queries';
import { Me } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class LoginSignupService {
  private loading: boolean = true;
  private _me: Me = {} as Me;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMe: EventEmitter<Me> = new EventEmitter();

  userLoginSignup(mutationType: any, variables: any) {
    let mutationDefinition = mutationType.definitions[0].name.value;
    this.apollo
      .mutate({
        mutation: mutationType,
        variables: { ...variables },
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result);
          this.loading = result.loading;
          this.changeLoading.emit(this.loading);
          console.log(this.loading, 'login service');
          let userData: any;
          if (mutationDefinition === 'addUser') {
            userData = result.data.addUser;
          } else if (mutationDefinition === 'login') {
            userData = result.data.login;
          }
          this._me = userData.user;
          this.authService.login(
            mutationDefinition === 'addUser'
              ? result.data.addUser.token
              : mutationDefinition === 'login'
              ? result.data.login.token
              : new Error('Something went wrong during login!')
          );
          this.changeMe.emit(this.me);
          !this.loading && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('login error', error);
        }
      );
  }

  queryMe() {
    this.apollo
      .watchQuery({
        query: QUERY_ME,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._me = result?.data?.me;
          console.log('query me data ', this._me);
          this.loading = result.loading;
          this.changeLoading.emit(this.loading);
          this.changeMe.emit(this._me);
          !this.loading && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('query me error', error);
        }
      );
  }
  get me() {
    return this._me;
  }

  get isLoading() {
    return this.loading;
  }

  deleteMe() {
    this._me = {} as Me;
  }
}
