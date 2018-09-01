import { TestBed, inject } from '@angular/core/testing';

import { MutualEvaluationService } from './mutual-evaluation.service';

describe('MutualEvaluationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MutualEvaluationService]
    });
  });

  it('should be created', inject([MutualEvaluationService], (service: MutualEvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
