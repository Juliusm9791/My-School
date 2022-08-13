import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlQueryService {

  constructor(private apollo: Apollo) { }

  query(queryRequest: any) {
    return this.apollo.query({
      query: queryRequest,
    }).pipe(map((m) => m));
  }

  mutation(mutationRequest: any, mutationVariable: any) {
    return this.apollo.mutate({
      mutation: mutationRequest,
      variables: { ...mutationVariable }
    }).pipe(map((m) => m.data
    ));
  }

}


// async onSubmit() {
//   const lodinRespond$ = this.queryService.mutation(LOGIN, {
//     email: this.loginForm.controls.email.value,
//     password: this.loginForm.controls.password.value
//   });
//   this.loginData = await lastValueFrom(lodinRespond$);
//   this.authService.login(this.loginData.login.token)

//   const queryMeData = await this.queryMe();
//   this.me = queryMeData.data;
//   this.loading = queryMeData.loading;
//   console.log(this.me)
// }

// async queryMe() {
//   this.queryService.query(QUERY_ME);
//   const meRespond$ = this.queryService.query(QUERY_ME);
//   const me = await lastValueFrom(meRespond$);
//   return me;
// }
