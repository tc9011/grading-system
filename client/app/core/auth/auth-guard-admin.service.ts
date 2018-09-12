import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate, CanLoad {

  constructor(public auth: AuthService,
              private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAdmin) {
      this.router.navigate(['/selfevaluation']);
    }

    return this.auth.isAdmin;
  }

  canLoad(): boolean {
    if (!this.auth.isAdmin) {
      this.router.navigate(['/selfevaluation']);
    }

    return this.auth.isAdmin;
  }
}
