import { TestBed } from '@angular/core/testing';

import { SysMgrService } from './sys-mgr.service';

describe('SysMgrService', () => {
  let service: SysMgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysMgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
