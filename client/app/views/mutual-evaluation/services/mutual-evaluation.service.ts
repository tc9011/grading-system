import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import {
  GetMutualEvaluation,
  InfoForGetMutualEvaluation,
  InfoForGetStatus,
  MutualEvaluation,
  Status
} from '../interfaces/mutual-evaluation';


@Injectable()
export class MutualEvaluationService {

  constructor(private httpService: HttpService) { }

  public getStatus(data: InfoForGetStatus): Observable<Status[]> {
    return this.httpService.postData('/api/v1/mutual/status', data);
  }

  public getMutualEvaluation(data: InfoForGetMutualEvaluation): Observable<GetMutualEvaluation> {
    return this.httpService.postData('/api/v1/mutual/getMutualEvaluation', data);
  }

  public postMutualEvaluation(data: MutualEvaluation): Observable<any> {
    return this.httpService.postData('/api/v1/mutual', data);
  }
}
