import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './passport/register/register.component';
import { LoginComponent } from './passport/login/login.component';
import { ViewsRoutingModule } from './views-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViewsRoutingModule
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class ViewsModule { }
