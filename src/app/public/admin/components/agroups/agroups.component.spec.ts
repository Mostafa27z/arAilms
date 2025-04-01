import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroupsComponent } from './agroups.component';

describe('AgroupsComponent', () => {
  let component: AgroupsComponent;
  let fixture: ComponentFixture<AgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
