import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class PassportService {

  constructor(private httpService: HttpService) { }

  postRegister(data): Observable<any> {
    return this.httpService.postData('/api/passport/register', data);
  }

  postLogin(data): Observable<any> {
    return this.httpService.postData('/api/passport/login', data);
  }
}
