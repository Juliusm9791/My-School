import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LOGIN } from 'src/app/services/graphql/mutations';
import { QUERY_ME } from 'src/app/services/graphql/queries';
import { Me } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loading: boolean = true;
  error: any;
  loginRespond: any;
  me: Me = {} as Me;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  @Output() changeLoading: EventEmitter<any> = new EventEmitter();

  userLogin(variables: any) {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: { ...variables }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.loginRespond = data;
      this.authService.login(this.loginRespond.login.token);
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
        this.changeLoading.emit({me: this.me, loading: this.loading })
        this.error = result.error;
      });
  }

}