import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { LoginInfo, User } from '../../views/passport/interfaces/passport';
import { PassportService } from '../../views/passport/services/passport.service';
import { StorageService } from '../storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';



@Injectable()
export class AuthService {
  public loggedIn = false;
  public isAdmin = false;
  public currentUser: User = new User();

  constructor(private jwtHelperService: JwtHelperService,
              private router: Router,
              private injector: Injector,
              private passportService: PassportService,
              private storageService: StorageService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }

  login(loginInfo: LoginInfo) {
    return this.passportService.postLogin(loginInfo).pipe(map(
      (res: any) => {
          this.storageService.setLocalStorage('token', res.token);
          const decodedUser = this.decodeUserFromToken(res.token);
          this.setCurrentUser(decodedUser);
          this.msg.success('登录成功!');
          return this.loggedIn;
        }
      )
    );
  }

  logout() {
    this.storageService.removeLocalStorage('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
  }

  decodeUserFromToken(token) {
    return this.jwtHelperService.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.workNumber = decodedUser.workNumber;
    this.currentUser.group = decodedUser.group;
    this.currentUser.role = decodedUser.role;
    this.isAdmin = decodedUser.role > 10;
    delete decodedUser.role;
  }
}
