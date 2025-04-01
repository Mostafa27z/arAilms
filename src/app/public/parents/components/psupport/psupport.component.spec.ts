import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsupportComponent } from './psupport.component';

describe('PsupportComponent', () => {
  let component: PsupportComponent;
  let fixture: ComponentFixture<PsupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
