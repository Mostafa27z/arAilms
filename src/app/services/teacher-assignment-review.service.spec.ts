import { TestBed } from '@angular/core/testing';

import { TeacherAssignmentReviewService } from './teacher-assignment-review.service';

describe('TeacherAssignmentReviewService', () => {
  let service: TeacherAssignmentReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAssignmentReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
