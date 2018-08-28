import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardLoginService } from './auth-guard-login.service';

describe('AuthGuardLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardLoginService]
    });
  });

  it('should be created', inject([AuthGuardLoginService], (service: AuthGuardLoginService) => {
    expect(service).toBeTruthy();
  }));
});
