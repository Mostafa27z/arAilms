import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonAssignmentUploadComponent } from './lesson-assignment-upload.component';

describe('LessonAssignmentUploadComponent', () => {
  let component: LessonAssignmentUploadComponent;
  let fixture: ComponentFixture<LessonAssignmentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonAssignmentUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonAssignmentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
