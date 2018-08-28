import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './passport/register/register.component';
import { LoginComponent } from './passport/login/login.component';
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PassportService } from './passport/services/passport.service';
import { Exception403Component } from './exception/403/exception403.component';
import { Exception404Component } from './exception/404/exception404.component';
import { Exception500Component } from './exception/500/exception500.component';
import { ExceptionComponent } from './exception/exception/exception.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewsRoutingModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    Exception403Component,
    Exception404Component,
    Exception500Component,
    ExceptionComponent
  ],
  providers: [PassportService]
})
export class ViewsModule { }
