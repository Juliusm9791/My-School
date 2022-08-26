import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_FACULTIES } from 'src/app/services/graphql/queries';
import { Faculty } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  loading: boolean = true;
  private _faculties: Faculty[] = [];

  constructor(private apollo: Apollo) {}
  @Output() changeFaculties: EventEmitter<any> = new EventEmitter();

  queryFaculties() {
    this.apollo
      .watchQuery({
        query: QUERY_FACULTIES,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._faculties = result?.data?.faculties;
          console.log('query faculty data ', this._faculties);
          this.loading = result.loading;
          // this.changeLoading.emit(this.loading)
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
