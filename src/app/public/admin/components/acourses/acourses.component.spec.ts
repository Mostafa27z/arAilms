import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoursesComponent } from './acourses.component';

describe('AcoursesComponent', () => {
  let component: AcoursesComponent;
  let fixture: ComponentFixture<AcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
