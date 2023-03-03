import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentFacultyComponent } from './department-faculty.component';

describe('DepartmentFacultyComponent', () => {
  let component: DepartmentFacultyComponent;
  let fixture: ComponentFixture<DepartmentFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
