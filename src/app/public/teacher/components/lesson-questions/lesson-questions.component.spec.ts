import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonQuestionsComponent } from './lesson-questions.component';

describe('LessonQuestionsComponent', () => {
  let component: LessonQuestionsComponent;
  let fixture: ComponentFixture<LessonQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
