import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';

@Injectable()
export class CollectService {

  constructor(private httpService: HttpService) { }

  public getCollects(workNumber: string, group: string, month: string, filter: string): Observable<string[]> {
    const data = { workNumber, group, month, filter };
    return this.httpService.postData('/api/v1/collect', data);
  }
}
