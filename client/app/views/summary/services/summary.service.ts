import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http/http.service';
import { Observable } from 'rxjs';
import { DetailPostData, MutualSummaryData, MutualSummaryParameter } from '../interfaces/summary';

@Injectable()
export class SummaryService {

  constructor(private httpService: HttpService) { }

  // 自评汇总
  public getAllSelfEvaluation(
    workNumber: string,
    group: string,
    year: string,
    month: string
  ): Observable<any> {
    return this.httpService.getData('/api/v1/selfsummary/workNumber/' + workNumber + '/group/' + group + '/year/' + year + '/month/' + month);
  }

  // 互评完成率统计
  public getMutualStatus(
    group: string,
    year: string,
    month: string
  ): Observable<number> {
    return this.httpService.getData('/api/v1/mutualsummary/group/' + group + '/year/' + year + '/month/' + month);
  }

  // 互评统计数据
  public getMutualSummaryData(
    filter: 'all' | 'achievement' | 'share' | 'contribution',
    data: MutualSummaryParameter
  ): Observable<MutualSummaryData[]> {
    return this.httpService.postData('/api/v1/mutualsummary/filter/' + filter, data);
  }

  // 互评详情
  public getMutualEvaluationDetails(data: DetailPostData): Observable<any[]> {
    return this.httpService.postData('/api/v1/mutualsummary/details', data);
  }
}
