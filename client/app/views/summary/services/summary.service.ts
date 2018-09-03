import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class SummaryService {

  constructor(private httpService: HttpService) { }

  // 自评汇总
  public getAllSelfEvaluation(workNumber: string, group: string, year: string, month: string): Observable<any> {
    return this.httpService.getData('/api/v1/selfsummary/workNumber/' + workNumber + '/group/' + group + '/year/' + year + '/month/' + month);
  }
}
