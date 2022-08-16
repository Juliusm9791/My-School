import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QUERY_ME } from 'src/app/services/graphql/queries';
import { Me } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  loading: boolean = true;
  error: any;
  signUpRespond: any;
  me: any;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  @Output() changeLoading: EventEmitter<any> = new EventEmitter();

  userLoginSignup(mutationType: any, variables: any) {
    let mutationDefinition = mutationType.definitions[0].name.value;
    this.apollo.mutate({
      mutation: mutationType,
      variables: { ...variables }
    }).subscribe(({ data }) => {
      console.log('got data2', data);
      this.signUpRespond = data;
      this.authService.login(mutationDefinition === "addUser" ? this.signUpRespond.addUser.token : 
      mutationDefinition === "login" ? this.signUpRespond.login.token : new Error('Something went wrong during login!'));
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
        this.changeLoading.emit({ me: this.me, loading: this.loading })
        this.error = result.error;
      });
  }
}
