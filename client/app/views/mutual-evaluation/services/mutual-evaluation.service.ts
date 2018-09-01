import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { InfoForGetStatus, Status } from '../interfaces/mutaul-evaluation';


@Injectable()
export class MutualEvaluationService {

  constructor(private httpService: HttpService) { }

  public getStatus(data: InfoForGetStatus): Observable<Status[]> {
    return this.httpService.postData('/api/v1/mutual/status', data);
  }
}
