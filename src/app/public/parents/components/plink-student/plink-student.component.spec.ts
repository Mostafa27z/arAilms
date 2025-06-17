import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlinkStudentComponent } from './plink-student.component';

describe('PlinkStudentComponent', () => {
  let component: PlinkStudentComponent;
  let fixture: ComponentFixture<PlinkStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlinkStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlinkStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
