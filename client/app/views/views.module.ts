import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './passport/register/register.component';
import { LoginComponent } from './passport/login/login.component';
import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PassportService } from './passport/services/passport.service';
import { AuthService } from './passport/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewsRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [PassportService, AuthService]
})
export class ViewsModule { }
