import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PattendanceComponent } from './pattendance.component';

describe('PattendanceComponent', () => {
  let component: PattendanceComponent;
  let fixture: ComponentFixture<PattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PattendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
