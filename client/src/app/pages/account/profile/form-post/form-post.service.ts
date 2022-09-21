import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_POST } from 'src/app/services/graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class FormPostService {
  loading: boolean = true;

  constructor(private apollo: Apollo,) { }
  addPost(title: string, description: string) {
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: { title: title, description: description },
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result);
          this.loading = result.loading;
          // this.changeLoading.emit(this.loading);
          // console.log(this.loading, 'login service');
          // let userData: any;
          console.log(result)
          // this.post = userData.user;
          // this.authService.login(
          //   mutationDefinition === 'addUser'
          //     ? result.data.addUser.token
          //     : mutationDefinition === 'login'
          //     ? result.data.login.token
          //     : new Error('Something went wrong during login!')
          // );
          // this.changeMe.emit(this.me);
          // !this.loading && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('add post error', error);
        }
      );


  }
}
