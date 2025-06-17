import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAssignmentsReviewComponent } from './teacher-assignments-review.component';

describe('TeacherAssignmentsReviewComponent', () => {
  let component: TeacherAssignmentsReviewComponent;
  let fixture: ComponentFixture<TeacherAssignmentsReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAssignmentsReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAssignmentsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
