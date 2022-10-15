import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/types/types';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @Input() department: Department = {} as Department;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  deparmentDetails(id: string){
      this.router.navigate(['/departments/' + id]);
  }
}
