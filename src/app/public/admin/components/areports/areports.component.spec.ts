import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreportsComponent } from './areports.component';

describe('AreportsComponent', () => {
  let component: AreportsComponent;
  let fixture: ComponentFixture<AreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
