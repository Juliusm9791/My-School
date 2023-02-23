import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
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
  isLoggedIn?: boolean;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router,
    private fireAuth: Auth
  ) {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMe: EventEmitter<Me> = new EventEmitter();

  async userLoginSignup(mutationType: any, variables: any) {
    let mutationDefinition = mutationType.definitions[0].name.value;
    mutationDefinition === 'login' &&
      (await this.loginFire(variables.email, variables.password));
    mutationDefinition === 'addUser' &&
      (await this.registerWithEmail(variables.email, variables.password));

    authState(this.fireAuth).subscribe((user) => {
      if (!!user) {
        variables.password = user.uid;
        this.apollo
          .mutate({
            mutation: mutationType,
            variables: { ...variables, fireUid: user.uid },
          })
          .subscribe(
            (result: any) => {
              console.log('got login/singup', result);
              this.loading = result.loading;
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
            },
            (error) => {
              console.log('login error', error);
            },
            () => {
              this.queryMe();
            }
          );
      }
    });
  }

  private async loginFire(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log('Connecting to Firebase');
      return;
    } catch (error) {
      console.log(error);
    }
  }

  private async registerWithEmail(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.fireAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  }

  queryMe() {
    if (this.isLoggedIn) {
      this.apollo
        .watchQuery({
          query: QUERY_ME,
          fetchPolicy: 'network-only',
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
  }

  resetPassword(email: any) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent!' + email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  get me() {
    return this._me;
  }

  get isLoading() {
    return this.loading;
  }
}
