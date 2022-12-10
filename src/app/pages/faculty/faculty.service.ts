import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_FACULTIES, QUERY_USERS } from 'src/app/services/graphql/queries';
import { Faculty, Me } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  loading: boolean = true;
  private _faculties: Faculty[] = [];
  private _facultyMenbers: Me[] = []
  facultyMenbersLoading: boolean = true;

  constructor(private apollo: Apollo) { }
  @Output() changeFaculties: EventEmitter<any> = new EventEmitter();

  @Output() changeFacultyMenbersLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() changeFacultyMenbers: EventEmitter<Me[]> = new EventEmitter();

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

  queryFacultyMenbers() {
    this.apollo
      .watchQuery({
        query: QUERY_USERS,
      })
      .valueChanges.subscribe(
        (result: any) => {
          this._facultyMenbers = result?.data?.users;
          console.log('query facultyMenbers data ', this._facultyMenbers);
          this.facultyMenbersLoading = result.loading;
          this.changeFacultyMenbersLoading.emit(this.facultyMenbersLoading);
          this.changeFacultyMenbers.emit(this._facultyMenbers);
          // !this.loading && this.router.navigate(['/account/profile']);
        },
        (error) => {
          console.log('query facultyMenbers error', error);
        }
      );
  }

  filterFacultyMembers() {
    console.log(this._facultyMenbers[0]?.groupId[0].groupName)
    console.log(this._facultyMenbers.filter((menber) => menber.groupId[0].groupName === "Faculty"))
    return this._facultyMenbers.filter((menber) => menber.groupId[0].groupName === "Faculty");
  }


  get faculties() {
    return this._faculties;
  }
}
