import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ADD_POST, UPDATE_PHOTOS, UPDATE_POST, DELETE_PHOTOS } from 'src/app/services/graphql/mutations';
import { QUERY_POSTS } from 'src/app/services/graphql/queries';

import * as S3 from 'aws-sdk/clients/s3';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormPostService {
  uploadSuccess$: Subject<any[]> = new Subject();
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
    eventLocation: string,
    photos: []
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
          console.log('got data', result, result.data.addPost._id);
          const id = result.data.addPost._id;
          if (photos.length !== 0) {
            this.uploadPhotos(photos, id, [], []);
          }
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
  async uploadPhotos(files: any, id: any, locations: any, deleteIds: any) {
    const bucket = new S3({
      accessKeyId: environment.ACCESS,
      secretAccessKey: environment.SECRET,
      region: 'us-east-2',
    });

    let updatedLocations: any[] = [];
    locations.forEach((e: any) => updatedLocations.push({id: e.id, location: e.location}));

    for (let i = 0; i < files.length; i++) {
      const contentType = files[i].file.type;
      const params = {
        Bucket: environment.BUCKET,
        Key: id + files[i].id,
        Body: files[i].file,
        ACL: 'public-read',
        ContentType: contentType,
      };

      try {
        const data = await bucket.upload(params).promise();

        const picture = {
          id: files[i].id,
          location: data.Location,
        };

        const index = updatedLocations.findIndex((e) => e.id == picture.id);
        if (index === -1) {
          updatedLocations.push(picture);
        }
      } catch (err) {
        console.log(err);
      }
      // bucket.upload(params, (err: any, data: any) => {
      //   if (err) {
      //     console.log('EROOR: ', JSON.stringify(err));
      //     return false;
      //   }
      //   console.log('File Uploaded.', data.Location);
      //   locations.push(data.Location);
      //   return true;
      // });
    }
    if (deleteIds.length !== 0) {
      for (let i = 0; i < deleteIds.length; i++) {
        // const params = {
        //   Bucket: BUCKET,
        //   Key: id + deleteIds[i],
        // };
        // try {
        //   await bucket.deleteObject(params).promise();
        //   console.log('file deleted Successfully');
        // } catch (err) {
        //   console.log('ERROR in file Deleting : ' + JSON.stringify(err));
        // }
        this.deletePhotos(id, deleteIds[i])
      }
    }
      this.updatePhotos(updatedLocations, id);
  }

  updatePhotos(locations: any[], id: string) {
    this.apollo
      .mutate({
        mutation: UPDATE_PHOTOS,
        variables: {
          id: id,
          pictures: locations,
        },
        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got photos', result);
          this.loading = result.loading;
          // result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('update photos error', error);
        }
      );
  };

  deletePhotos(id: string, pictureId: number) {
    this.apollo
      .mutate({
        mutation: DELETE_PHOTOS,
        variables: {
          id: id,
          pictureId: pictureId,
        },
        refetchQueries: [
          {
            query: QUERY_POSTS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('delete photo', result);
          this.loading = result.loading;
          // result && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('delete photo error', error);
        }
      );
  }
}
