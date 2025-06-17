import { TestBed } from '@angular/core/testing';

import { LessonQuestionService } from './lesson-question.service';

describe('LessonQuestionService', () => {
  let service: LessonQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
