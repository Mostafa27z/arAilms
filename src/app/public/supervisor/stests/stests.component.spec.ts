import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StestsComponent } from './stests.component';

describe('StestsComponent', () => {
  let component: StestsComponent;
  let fixture: ComponentFixture<StestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
