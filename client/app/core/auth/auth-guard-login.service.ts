import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLogin implements CanActivate {

  constructor(public auth: AuthService,
              private router: Router) { }

  canActivate() {
    if (!this.auth.loggedIn) {
      this.router.navigate(['/passport/login']);
    }
    return this.auth.loggedIn;
  }
}
