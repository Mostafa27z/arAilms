import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PperformanceComponent } from './pperformance.component';

describe('PperformanceComponent', () => {
  let component: PperformanceComponent;
  let fixture: ComponentFixture<PperformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PperformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
