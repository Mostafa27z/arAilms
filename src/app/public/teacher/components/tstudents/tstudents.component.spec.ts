import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TstudentsComponent } from './tstudents.component';

describe('TstudentsComponent', () => {
  let component: TstudentsComponent;
  let fixture: ComponentFixture<TstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TstudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
