import { TestBed } from '@angular/core/testing';

import { ExamQuestionService } from './exam-question.service';

describe('ExamQuestionService', () => {
  let service: ExamQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
