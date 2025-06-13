import { TestBed } from '@angular/core/testing';

import { StudentSubmissionService } from './student-submission.service';

describe('StudentSubmissionService', () => {
  let service: StudentSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
