import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgroupsComponent } from './tgroups.component';

describe('TgroupsComponent', () => {
  let component: TgroupsComponent;
  let fixture: ComponentFixture<TgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TgroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
