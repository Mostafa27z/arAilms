import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SattendanceComponent } from './sattendance.component';

describe('SattendanceComponent', () => {
  let component: SattendanceComponent;
  let fixture: ComponentFixture<SattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SattendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
