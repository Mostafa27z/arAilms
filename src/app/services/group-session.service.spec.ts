import { TestBed } from '@angular/core/testing';

import { GroupSessionService } from './group-session.service';

describe('GroupSessionService', () => {
  let service: GroupSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
