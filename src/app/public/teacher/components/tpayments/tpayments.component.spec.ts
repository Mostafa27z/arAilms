import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaymentsComponent } from './tpayments.component';

describe('TpaymentsComponent', () => {
  let component: TpaymentsComponent;
  let fixture: ComponentFixture<TpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
