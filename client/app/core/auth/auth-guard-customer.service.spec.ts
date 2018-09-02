import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardCustomerService } from './auth-guard-customer.service';

describe('AuthGuardCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardCustomerService]
    });
  });

  it('should be created', inject([AuthGuardCustomerService], (service: AuthGuardCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
