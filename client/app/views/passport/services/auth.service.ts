import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { PassportService } from './passport.service';
import { User } from '../interfaces/passport';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  currentUser: User = new User();

  constructor(private jwtHelperService: JwtHelperService,
              private passportService: PassportService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  decodeUserFromToken(token) {
    return this.jwtHelperService.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser.workNumber = decodedUser.workNumber;
    this.currentUser.group = decodedUser.group;
    this.currentUser.role = decodedUser.role;
    decodedUser.role > 10 ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }
}
