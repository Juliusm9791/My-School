import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/types/types';

import { DepartmentsService } from './departments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentsService: DepartmentsService) {
    this.departmentsService.changeDepartments.subscribe((departments) => {
      this.departments = departments;
    });
    // this.departments = this.departmentsService.departments;
  }
  ngOnInit(): void {
    this.departmentsService.queryDepartment();
  }
}
