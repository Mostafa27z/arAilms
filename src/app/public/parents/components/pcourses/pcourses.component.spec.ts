import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcoursesComponent } from './pcourses.component';

describe('PcoursesComponent', () => {
  let component: PcoursesComponent;
  let fixture: ComponentFixture<PcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
