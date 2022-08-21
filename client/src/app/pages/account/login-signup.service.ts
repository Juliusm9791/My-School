import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QUERY_ME } from 'src/app/services/graphql/queries';
// import { QUERY_ME } from 'src/app/services/graphql/queries';
import { Me } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  loading: boolean = true;
  error: any;
  // signUpRespond: any;
  me: any;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeMe: EventEmitter<any> = new EventEmitter();

  userLoginSignup(mutationType: any, variables: any) {
    let mutationDefinition = mutationType.definitions[0].name.value;
    this.apollo.mutate({
      mutation: mutationType,
      variables: { ...variables }
    }).subscribe((result: any) => {
      console.log('got data2', result);
      this.loading = result.loading;
      let userData: any;
      if (mutationDefinition === "addUser") {
        userData = result.data.addUser;
      } else if (mutationDefinition === "login") {
        userData = result.data.login;
      }
      this.me = userData.user
      this.authService.login(mutationDefinition === "addUser" ? result.data.addUser.token :
        mutationDefinition === "login" ? result.data.login.token : new Error('Something went wrong during login!'));
      this.changeLoading.emit(this.loading)
      this.changeMe.emit(this.me)
    }, (error) => {
      console.log('login error', error);
    });
  }

  queryMe() {
    this.apollo
      .watchQuery({
        query: QUERY_ME,
      })
      .valueChanges.subscribe((result: any) => {
        this.me = result?.data?.me;
        console.log(this.me)
        this.loading = result.loading;
        this.changeLoading.emit(this.loading)
        this.changeMe.emit(this.me)
        this.error = result.error;
      });
  }
}
