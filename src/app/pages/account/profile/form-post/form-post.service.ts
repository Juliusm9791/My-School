import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ADD_POST } from 'src/app/services/graphql/mutations';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class FormPostService {
  loading: boolean = true;

  constructor(private apollo: Apollo, private router: Router) {}

  addPost(
    title: string,
    description: string,
    isEvent: boolean,
    selectedDepartmentId: string
  ) {
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          title: title,
          description: description,
          isEvent: isEvent,
          departmentId: selectedDepartmentId,
        },

        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result);
          this.loading = result.loading;
          result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('add post error', error);
        }
      );
  }
}
