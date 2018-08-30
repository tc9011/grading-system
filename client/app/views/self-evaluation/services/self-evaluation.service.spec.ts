import { TestBed, inject } from '@angular/core/testing';

import { SelfEvaluationService } from './self-evaluation.service';

describe('SelfEvaluationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelfEvaluationService]
    });
  });

  it('should be created', inject([SelfEvaluationService], (service: SelfEvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
