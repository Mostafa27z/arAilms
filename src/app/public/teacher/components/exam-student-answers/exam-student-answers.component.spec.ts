import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentAnswersComponent } from './exam-student-answers.component';

describe('ExamStudentAnswersComponent', () => {
  let component: ExamStudentAnswersComponent;
  let fixture: ComponentFixture<ExamStudentAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamStudentAnswersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamStudentAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
