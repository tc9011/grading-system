import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardLogin } from './auth-guard-login.service';

describe('AuthGuardLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardLogin]
    });
  });

  it('should be created', inject([AuthGuardLogin], (service: AuthGuardLogin) => {
    expect(service).toBeTruthy();
  }));
});
