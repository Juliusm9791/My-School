import { Component, OnInit } from '@angular/core';

import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments:any
  constructor(private departmentsService: DepartmentsService) { 
    this.departmentsService.changeDepartments.subscribe((departments)=>{
    this.departments= departments
    })
  this.departments =this.departmentsService.departments
  }
  ngOnInit(): void {
    this.departmentsService.queryDepartment()
  }

}
