import { EventEmitter, Injectable, Output } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_DEPARTMENTS } from 'src/app/services/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  loading: boolean=true
  private _departments:any
  departments: any;
  
    constructor(private apollo: Apollo) { }
    @Output() changeDepartments: EventEmitter<any> = new EventEmitter()
  
    queryDepartment() {
      this.apollo
        .watchQuery({
          query: QUERY_DEPARTMENTS,
        })
        .valueChanges.subscribe((result: any) => {
          this._departments = result?.data?.departments;
          console.log("query faculty data ", this._departments)
          this.loading = result.loading;
          // this.changeLoading.emit(this.loading)
           this.changeDepartments.emit(this._departments)
        }, (error) => {
          console.log('query faculty error', error);
        });
    }
    // get departments(){
    //   return this._departments
    // }
}
