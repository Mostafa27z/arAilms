import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SstudentsComponent } from './sstudents.component';

describe('SstudentsComponent', () => {
  let component: SstudentsComponent;
  let fixture: ComponentFixture<SstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SstudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
