import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ADD_POST } from 'src/app/services/graphql/mutations';
import { UPDATE_POST } from 'src/app/services/graphql/mutations';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';

import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root',
})
export class FormPostService {
  loading: boolean = true;

  constructor(private apollo: Apollo, private router: Router) {}

  addPost(
    isVisible: boolean,
    title: string,
    description: string,
    isEvent: boolean,
    selectedDepartmentId: string,
    selectedGradeId: string,
    eventDate: string,
    eventEndDate: string,
    eventLocation: string
  ) {
    this.apollo
      .mutate({
        mutation: ADD_POST,
        variables: {
          isVisible: isVisible,
          title: title,
          description: description,
          isEvent: isEvent,
          eventDate: eventDate,
          eventEndDate: eventEndDate,
          eventLocation: eventLocation,
          departmentId: selectedDepartmentId,
          gradeId: selectedGradeId,
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

  updatePost(
    postId: string,
    isVisible: boolean,
    title: string,
    description: string,
    isEvent: boolean,
    selectedDepartmentId: string,
    selectedGradeId: string,
    eventDate: string,
    eventEndDate: string,
    eventLocation: string
  ) {
    this.apollo
      .mutate({
        mutation: UPDATE_POST,
        variables: {
          postId: postId,
          isVisible: isVisible,
          title: title,
          description: description,
          isEvent: isEvent,
          eventDate: eventDate,
          eventEndDate: eventEndDate,
          eventLocation: eventLocation,
          departmentId: selectedDepartmentId,
          gradeId: selectedGradeId,
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
          console.log('Failed to update error', error);
        }
      );
  }
}
