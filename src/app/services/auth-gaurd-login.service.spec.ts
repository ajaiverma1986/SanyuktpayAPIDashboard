import { TestBed } from '@angular/core/testing';

import { AuthGaurdLoginService } from './auth-gaurd-login.service';

describe('AuthGaurdLoginService', () => {
  let service: AuthGaurdLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurdLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
