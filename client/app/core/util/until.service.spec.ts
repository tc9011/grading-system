import { TestBed, inject } from '@angular/core/testing';

import { UntilService } from './until.service';

describe('UntilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UntilService]
    });
  });

  it('should be created', inject([UntilService], (service: UntilService) => {
    expect(service).toBeTruthy();
  }));
});
