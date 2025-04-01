import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SasideComponent } from './saside.component';

describe('SasideComponent', () => {
  let component: SasideComponent;
  let fixture: ComponentFixture<SasideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SasideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
