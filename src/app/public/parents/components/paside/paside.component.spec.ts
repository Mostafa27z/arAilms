import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasideComponent } from './paside.component';

describe('PasideComponent', () => {
  let component: PasideComponent;
  let fixture: ComponentFixture<PasideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
