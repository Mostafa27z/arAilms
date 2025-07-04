import { TestBed } from '@angular/core/testing';

import { ExamAnswerService } from './exam-answer.service';

describe('ExamAnswerService', () => {
  let service: ExamAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
