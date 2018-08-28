import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate,  CanActivateChild {

  constructor(public auth: AuthService,
              private router: Router) { }

  canActivate() {
    if (!this.auth.loggedIn) {
      this.router.navigate(['/passport/login']);
    }
    return this.auth.loggedIn;
  }

  canActivateChild() {
    return this.canActivate();
  }
}
