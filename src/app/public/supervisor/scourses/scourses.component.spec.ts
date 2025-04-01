import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoursesComponent } from './scourses.component';

describe('ScoursesComponent', () => {
  let component: ScoursesComponent;
  let fixture: ComponentFixture<ScoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
