import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardAdmin } from './auth-guard-admin.service';

describe('AuthGuardAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardAdmin]
    });
  });

  it('should be created', inject([AuthGuardAdmin], (service: AuthGuardAdmin) => {
    expect(service).toBeTruthy();
  }));
});
