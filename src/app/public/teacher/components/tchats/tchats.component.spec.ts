import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatsComponent } from './tchats.component';

describe('TchatsComponent', () => {
  let component: TchatsComponent;
  let fixture: ComponentFixture<TchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TchatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
