import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { LoginInfo, ModifyPasswordInfo, User } from '../interfaces/passport';

@Injectable()
export class PassportService {

  constructor(private httpService: HttpService) { }

  postRegister(user: User): Observable<User> {
    return this.httpService.postData('/api/v1/passport/register', user);
  }

  postLogin(loginInfo: LoginInfo): Observable<LoginInfo> {
    return this.httpService.postData('/api/v1/passport/login', loginInfo);
  }

  modifyPassword(data: ModifyPasswordInfo): Observable<any> {
    return this.httpService.putData('/api/v1/passport/modifypassword', data);
  }

  getGroups(): Observable<string[]> {
    return this.httpService.getData('/api/v1/passport/groups');
  }
}
