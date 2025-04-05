import { TestBed } from '@angular/core/testing';

import { UtilityserService } from './utilityser.service';

describe('UtilityserService', () => {
  let service: UtilityserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
