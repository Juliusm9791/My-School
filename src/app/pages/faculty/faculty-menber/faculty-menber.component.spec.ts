import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMenberComponent } from './faculty-menber.component';

describe('FacultyMenberComponent', () => {
  let component: FacultyMenberComponent;
  let fixture: ComponentFixture<FacultyMenberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyMenberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyMenberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
