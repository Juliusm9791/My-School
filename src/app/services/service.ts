import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  QUERY_GRADES,
  QUERY_FACULTIES,
  QUERY_USER,
  QUERY_NOTIFICATIONS,
} from 'src/app/services/graphql/queries';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION, UPDATE_NOTIFICATION } from './graphql/mutations';
import { Grade, Faculty, Me, Notification } from 'src/app/types/types';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ArchiveGroupSettings } from 'aws-sdk/clients/medialive';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  loading: boolean = true;
  private _grades: Grade[] = [];
  // departments: any;

  constructor(private apollo: Apollo) {}
  @Output() changeGrades: EventEmitter<any> = new EventEmitter();
  @Output() changeGradesLoading: EventEmitter<any> = new EventEmitter();

  queryGrade() {
    this.apollo
      .watchQuery({
        query: QUERY_GRADES,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._grades = result?.data?.grades;
          console.log('query grades data ', this._grades);
          this.loading = result.loading;
          this.changeGradesLoading.emit(this.loading);
          this.changeGrades.emit(this._grades);
        },
        (error) => {
          console.log('query grade error', error);
        }
      );
  }
  get grades() {
    return this._grades;
  }
}

@Injectable({
  providedIn: 'root',
})
export class FacultiesService {
  loading: boolean = true;
  private _faculties: Faculty[] = [];
  // departments: any;

  constructor(private apollo: Apollo) {}
  @Output() changeFaculties: EventEmitter<any> = new EventEmitter();
  @Output() changeFacultiesLoading: EventEmitter<any> = new EventEmitter();

  queryFaculty() {
    this.apollo
      .watchQuery({
        query: QUERY_FACULTIES,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._faculties = result?.data?.faculties;
          console.log('query faculties data ', this._faculties);
          this.loading = result.loading;
          this.changeFacultiesLoading.emit(this.loading);
          this.changeFaculties.emit(this._faculties);
        },
        (error) => {
          console.log('query faculty error', error);
        }
      );
  }
  get faculties() {
    return this._faculties;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: Me = {} as Me;
  loading: boolean = true;
  constructor(private apollo: Apollo, private authService: AuthService) {}
  @Output() changeUserLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeUser: EventEmitter<Me> = new EventEmitter();

  queryUser(id: string) {
    this.apollo
      .watchQuery({
        query: QUERY_USER,
        variables: {
          id: id,
        },
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._user = result?.data?.user;
          console.log('query user data ', this._user);
          this.loading = result.loading;
          this.changeUserLoading.emit(this.loading);
          this.changeUser.emit(this._user);
        },
        (error) => {
          console.log('query user error', JSON.stringify(error, null, 2));
        }
      );
  }
  get user() {
    return this._user;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  loading: boolean = true;
  error: any;
  errorUserPost: any;
  private _notifications: Notification[] = [];

  constructor(private apollo: Apollo) {}
  @Output() changeNotifications: EventEmitter<any> = new EventEmitter();
  @Output() changeLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeError: EventEmitter<any> = new EventEmitter();

  queryNotifications() {
    this.apollo
      .watchQuery({
        query: QUERY_NOTIFICATIONS
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._notifications = result?.data?.notifications;
          console.log('query notifications data ', this._notifications);
          this.loading = result.loading;
          this.changeLoading.emit(this.loading);
          this.changeNotifications.emit(this._notifications);
        },
        (error) => {
          this.changeError.emit(this.error);
          console.log('query posts error', error);
        }
      );
  }
  addNotification(
    receiver: string,
    type: string,
    referPost: string
  ) {
    this.apollo
      .mutate({
        mutation: ADD_NOTIFICATION,
        variables: {
          receiver: receiver,
          type: type,
          referPost: referPost,
        },

        refetchQueries: [
          {
            query: QUERY_NOTIFICATIONS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result, result.data.addNotification._id);
        },
        (error) => {
          console.log('add notificaiton error', JSON.stringify(error, null, 2));
        }
      );
  }
  deleteNotification(id: string) {
    this.apollo
      .mutate({
        mutation: DELETE_NOTIFICATION,
        variables: { id: id },
        refetchQueries: [
          {
            query: QUERY_NOTIFICATIONS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('Notification Deleted', result);
        },
        (error) => {
          console.log('delete notification error', JSON.stringify(error, null, 2));
        }
      );
  }
  updatePost(
    id: string,
    isRead: boolean
  ) {
    this.apollo
      .mutate({
        mutation: UPDATE_NOTIFICATION,
        variables: {
          id: id,
          isRead: isRead,
        },
        refetchQueries: [
          {
            query: QUERY_NOTIFICATIONS,
          },
        ],
      })
      .subscribe(
        (result: any) => {
          console.log('got data', result);
          this.loading = result.loading;          
        },
        (error) => {
          console.log('Failed to update error', error);
        }
      );
  }

}
