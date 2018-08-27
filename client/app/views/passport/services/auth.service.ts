import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { PassportService } from './passport.service';
import { LoginInfo, User } from '../interfaces/passport';
import { StorageService } from '../../../core/storage/storage.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  currentUser: User = new User();

  constructor(private jwtHelperService: JwtHelperService,
              private router: Router,
              private passportService: PassportService,
              private storageService: StorageService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  login(loginInfo: LoginInfo) {
    return this.passportService.postLogin(loginInfo).pipe(map(
      (res: any) => {
          this.storageService.setLocalStorage('token', res.token);
          const decodedUser = this.decodeUserFromToken(res.token);
          this.setCurrentUser(decodedUser);
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
    this.router.navigate(['/']);
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
