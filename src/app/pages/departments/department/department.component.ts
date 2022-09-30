import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/types/types';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() department: Department = {} as Department;
  
  constructor() { }

  ngOnInit(): void {
  }

}
