import { TestBed } from '@angular/core/testing';

import { ReportmanService } from './reportman.service';

describe('ReportmanService', () => {
  let service: ReportmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
