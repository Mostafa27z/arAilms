import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpaymentsComponent } from './ppayments.component';

describe('PpaymentsComponent', () => {
  let component: PpaymentsComponent;
  let fixture: ComponentFixture<PpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
