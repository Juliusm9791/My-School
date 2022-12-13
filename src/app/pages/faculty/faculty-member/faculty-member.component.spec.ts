import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyMemberComponent } from './faculty-member.component';

describe('FacultyMenberComponent', () => {
  let component: FacultyMemberComponent;
  let fixture: ComponentFixture<FacultyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
