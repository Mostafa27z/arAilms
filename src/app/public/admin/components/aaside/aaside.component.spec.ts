import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AasideComponent } from './aaside.component';

describe('AasideComponent', () => {
  let component: AasideComponent;
  let fixture: ComponentFixture<AasideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AasideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
