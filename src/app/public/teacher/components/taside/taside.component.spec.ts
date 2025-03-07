import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasideComponent } from './taside.component';

describe('TasideComponent', () => {
  let component: TasideComponent;
  let fixture: ComponentFixture<TasideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
