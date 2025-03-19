import { TestBed } from '@angular/core/testing';

import { FinoDMTService } from './fino-dmt.service';

describe('FinoDMTService', () => {
  let service: FinoDMTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinoDMTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
