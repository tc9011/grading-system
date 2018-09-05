import { TestBed, inject } from '@angular/core/testing';

import { CollectService } from './collect.service';

describe('CollectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectService]
    });
  });

  it('should be created', inject([CollectService], (service: CollectService) => {
    expect(service).toBeTruthy();
  }));
});
