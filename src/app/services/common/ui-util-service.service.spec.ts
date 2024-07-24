import { TestBed } from '@angular/core/testing';

import { UiUtilServiceService } from './ui-util-service.service';

describe('UiUtilServiceService', () => {
  let service: UiUtilServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiUtilServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
