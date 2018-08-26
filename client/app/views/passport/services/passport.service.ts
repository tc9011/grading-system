import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../../core/http/http.service';
import { Login, User } from '../../../shared/interfaces/passport';

@Injectable()
export class PassportService {

  constructor(private httpService: HttpService) { }

  postRegister(user: User): Observable<User> {
    return this.httpService.postData('/api/passport/register', user);
  }

  postLogin(login: Login): Observable<Login> {
    return this.httpService.postData('/api/passport/login', login);
  }
}
