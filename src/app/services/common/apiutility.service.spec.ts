import { TestBed } from '@angular/core/testing';

import { ApiutilityService } from './apiutility.service';

describe('ApiutilityService', () => {
  let service: ApiutilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiutilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
