import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteachersComponent } from './steachers.component';

describe('SteachersComponent', () => {
  let component: SteachersComponent;
  let fixture: ComponentFixture<SteachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
