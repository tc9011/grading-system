import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { SelfEvaluation } from '../interfaces/self-evaluation';

@Injectable()
export class SelfEvaluationService {

  constructor(private httpService: HttpService) {
  }

  postSelfEvaluation(data: SelfEvaluation): Observable<any> {
    return this.httpService.postData('/api/v1/self', data);
  }

  getAllSelfEvaluation(workNumber: string): Observable<SelfEvaluation[]> {
    return this.httpService.getData('/api/v1/self/workNumber/' + workNumber);
  }

  getSelfEvaluationByMonth(workNumber: string, month: string): Observable<any> {
    return this.httpService.postData('/api/v1/self/monthInfo',{ workNumber, month });
  }

  deleteSelfEvaluation(workNumber: string, data: string[]): Observable<any> {
    return this.httpService.postData('/api/v1/self/workNumber/' + workNumber + '/batch', data);
  }

  putSelfEvaluation(oldMonth: string, data: SelfEvaluation): Observable<any> {
    return this.httpService.putData('/api/v1/self', { oldMonth, data });
  }
}
