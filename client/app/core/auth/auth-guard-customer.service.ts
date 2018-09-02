import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCustomer implements CanActivate, CanLoad {

  constructor(public auth: AuthService,
              private router: Router) { }

  canActivate() {
    if (this.auth.isAdmin) {
      this.router.navigate(['/peoplemanage']);
    }

    return !this.auth.isAdmin;
  }

  canLoad() {
    if (this.auth.isAdmin) {
      this.router.navigate(['/peoplemanage']);
    }

    return !this.auth.isAdmin;
  }
}
