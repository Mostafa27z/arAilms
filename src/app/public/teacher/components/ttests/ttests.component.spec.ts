import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtestsComponent } from './ttests.component';

describe('TtestsComponent', () => {
  let component: TtestsComponent;
  let fixture: ComponentFixture<TtestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
