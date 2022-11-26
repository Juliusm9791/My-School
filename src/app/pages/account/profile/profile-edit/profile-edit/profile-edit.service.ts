import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UPDATE_ME } from 'src/app/services/graphql/mutations';
import { QUERY_ME } from 'src/app/services/graphql/queries';

@Injectable({
  providedIn: 'root',
})
export class FormProfileService {
  loading: boolean = true;

  constructor(private apollo: Apollo, private router: Router) {}

  updateProfile(
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    phoneNumber: string,
    aboutMe: string,
    departmentId: string [],
    groupId: string [],
    gradeId: string []
  ) {
    this.apollo
      .mutate({
        mutation: UPDATE_ME,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          phoneNumber: phoneNumber,
          aboutMe: aboutMe,
          departmentId: departmentId,
          groupId: groupId,
          gradeId: gradeId
        },

        refetchQueries: [
          {
            query: QUERY_ME,
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
          console.log('update profile error', error);
        }
      );
  }
};

