import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlayoutComponent } from './tlayout.component';

describe('TlayoutComponent', () => {
  let component: TlayoutComponent;
  let fixture: ComponentFixture<TlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
