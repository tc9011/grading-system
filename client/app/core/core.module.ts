import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './http/interceptor.service';
import { HttpService } from './http/http.service';
import { StorageService } from './storage/storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardLogin } from './auth/auth-guard-login.service';
import { AuthGuardAdmin } from './auth/auth-guard-admin.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    HttpService,
    AuthService,
    StorageService,
    AuthGuardLogin,
    AuthGuardAdmin
  ]
})
export class CoreModule { }
