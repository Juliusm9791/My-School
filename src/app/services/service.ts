import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  QUERY_GRADES,
  QUERY_FACULTIES,
  QUERY_USER,
} from 'src/app/services/graphql/queries';
import { Grade, Faculty, Me } from 'src/app/types/types';
import { AuthService } from 'src/app/services/auth/auth.service';

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
