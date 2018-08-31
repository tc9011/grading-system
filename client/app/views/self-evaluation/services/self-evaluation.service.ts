import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { SelfEvaluation } from '../interfaces/self-evaluation';

@Injectable()
export class SelfEvaluationService {

  constructor(private httpService: HttpService) {
  }

  postSelfEvaluation(data: SelfEvaluation): Observable<SelfEvaluation> {
    return this.httpService.postData('/api/v1/self', data);
  }

  getAllSelfEvaluation(workNumber: string): Observable<SelfEvaluation[]> {
    return this.httpService.getData('/api/v1/self/' + workNumber);
  }
}
