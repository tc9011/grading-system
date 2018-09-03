import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class PeopleManageService {

  constructor(private httpService: HttpService) {
  }

  public getAllGroupUsers(group: string): Observable<any[]> {
    return this.httpService.getData('/api/v1/peoplemanage/group/' + group);
  }
}
