import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { UPDATE_AVATAR, UPDATE_ME } from 'src/app/services/graphql/mutations';
import { QUERY_ME } from 'src/app/services/graphql/queries';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';

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
    departmentId: string[],
    groupId: string[],
    gradeId: string[]
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
          gradeId: gradeId,
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

  updateAvatar(avatar: string) {
    console.log(avatar);
    this.apollo
      .mutate({
        mutation: UPDATE_AVATAR,
        variables: {
          avatar: avatar,
        },
        refetchQueries: [
          {
            query: QUERY_ME,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got image', result);
          this.loading = result.loading;
          result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('update avatar error', error);
        }
      );
  }

  uploadFile(file: any, id: any) {
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: environment.ACCESS,
      secretAccessKey: environment.SECRET,
      region: 'us-east-2',
    });
    const params = {
      Bucket: environment.BUCKET,
      Key: id + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('EROOR: ', JSON.stringify(err));
        return false;
      }
      console.log('File Uploaded.', data, data.Location);
      this.updateAvatar(
        'https://ik.imagekit.io/myschool/' + data.Key + '?tr=w-200,h-200'
      );
      return true;
    });
  }
}
