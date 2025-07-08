import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentsComponent } from './exam-students.component';

describe('ExamStudentsComponent', () => {
  let component: ExamStudentsComponent;
  let fixture: ComponentFixture<ExamStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
