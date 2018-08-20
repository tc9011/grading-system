import { TestBed, inject } from '@angular/core/testing';

import { PassportService } from './passport.service';

describe('PassportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassportService]
    });
  });

  it('should be created', inject([PassportService], (service: PassportService) => {
    expect(service).toBeTruthy();
  }));
});
