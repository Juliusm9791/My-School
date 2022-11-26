import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  QUERY_GRADES,
  QUERY_FACULTIES,
} from 'src/app/services/graphql/queries';
import { Grade, Faculty } from 'src/app/types/types';

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
